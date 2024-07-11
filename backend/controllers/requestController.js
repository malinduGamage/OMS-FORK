const { addChild, updateChild, deleteChild } = require("./childController");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getRequest = async (req, res) => {
    const requestid = req.params.requestId;

    try {
        const request = await prisma.request.findUnique({
            where: {
                requestid: requestid
            }
        })
        if (!request) return res.status(404).json({ success: false, message: 'Resource not found' });
        //check if user is authorized to view request
        if (request.sender !== req.userId && request.receiver !== req.userId) return res.sendStatus(401);

        res.status(200).json({
            success: true,
            request: request
        })
    } catch (error) {
        console.error('Database query failed:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching request.'
        });
    }

}

const getSentRequests = async (req, res) => {
    try {
        const requests = await prisma.request.findMany({
            where: {
                sender: req.userId
            },
            select: {
                requestid: true,
                type: true,
                entity: true,
                status: true,
                created_at: true
            }
        })
        res.status(200).json({
            success: true,
            requests: requests
        })
    } catch (error) {
        console.error('Database query failed:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching requests.'
        });
    }
}

const getReceivedRequests = async (req, res) => {
    try {
        const requests = await prisma.request.findMany({
            where: {
                receiver: req.userId
            },
            select: {
                requestid: true,
                type: true,
                entity: true,
                status: true,
                created_at: true
            }
        })
        res.status(200).json({
            success: true,
            requests: requests
        })
    } catch (error) {
        console.error('Database query failed:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching requests.'
        });
    }
}

const createAddChildRequest = async (req, res) => {
    const { orphanageid } = req.body;
    //check if orphanageid is present and user is authorized to create request
    if ((!req?.orphanageid) || (orphanageid !== req.orphanageid)) {
        return res.status(401).status({ success: false, message: 'Unauthorized' });
    }

    try {
        //fetch receiver from database
        const receiverOrphanage = await prisma.orphanage.findUnique({
            where: {
                orphanageid: orphanageid
            },
            select: { headid: true }
        })
        //check if receiver orphanage exists
        if (!receiverOrphanage) return res.status(404).json({ success: false, message: 'Resource not found' });
        //create request in database
        const newRequest = await prisma.request.create({
            data: {
                type: 'create',
                entity: 'child',
                request: req.body,
                receiver: receiverOrphanage.headid,
                sender: req.userId,
                message: req.body.message
            },
            select: {
                requestid: true,
                type: true,
                entity: true,
                status: true,
                created_at: true
            }
        })

        res.status(200).json({
            success: true,
            message: 'Request created successfully.',
            data: newRequest
        })
    } catch (error) {
        console.error('Database query failed:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred'
        });
    }
}

const handleAddChildRequest = async (req, res) => {
    const { requestid, response } = req.body;
    console.log(requestid, response);
    //check if requestid and response are present
    if (!requestid || !response) return res.status(400).json({ 'success': false, message: 'Bad request' });

    try {
        //fetch request from database
        const request = await prisma.request.findUnique({
            where: {
                requestid: requestid
            }
        })
        //check if request exists
        if (!request) return res.status(404).json({ 'success': false, message: 'Resource not found' });
        //check if request is of type create and entity is child
        if (request.type !== 'create' || request.entity !== 'child' || request.status === 'approved' || request.status === 'rejected') return res.status(400).json({ 'success': false, message: 'Bad request' });
        //check if user is authorized to handle request
        if (request.receiver !== req.userId) return res.status(401).json({ 'success': false, message: 'Unauthorized' });
        //if request is accepted, add child
        let result;
        console.log(request.request)
        if (response === 'approved') {
            req.body = request.request;
            result = await addChild(req);
            if (result === 500) return res.status(result).json({ success: false, message: 'An error occurred' });
            else if (result === 401) return res.status(result).json({ success: false, message: 'Unauthorized' });

        }
        //update request with response
        const updatedRequest = await prisma.request.update({
            where: {
                requestid: requestid
            },
            data: {
                status: response
            },
            select: {
                requestid: true,
                type: true,
                entity: true,
                status: true,
                created_at: true
            }
        })


        res.status(200).json({ 'success': true, data: updatedRequest });

    } catch (error) {
        console.error('Database query failed:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred'
        });
    }
}

const createEditChildRequest = async (req, res) => {
    const { childid } = req.body;  //extracting childid from request
    try {
        const child = await prisma.child.findUnique({
            where: {
                childid: childid
            },
            select: { orphanageid: true }
        })

        if (!child) return res.status(404).json({ success: false, message: 'Resource not found' });

        if ((!req.orphanageid) || (child.orphanageid !== req.orphanageid)) return res.status(401).json({ 'success': false, message: 'Unauthorized' });

        const orphanage = await prisma.orphanage.findUnique({
            where: {
                orphanageid: child.orphanageid
            },
            select: { headid: true }
        })

        if (!orphanage) return res.status(404).json({ success: false, message: 'Resource not found' });

        const newRequest = await prisma.request.create({
            data: {
                type: 'update',
                entity: 'child',
                request: req.body,
                receiver: orphanage.headid,
                sender: req.userId
            },
            select: {
                requestid: true,
                type: true,
                entity: true,
                status: true,
                created_at: true
            }
        })

        res.status(200).json({
            success: true,
            message: 'Request created successfully.',
            data: newRequest
        })

    } catch (error) {
        console.error('Database query failed:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred'
        });
    }
}

const handleEditChildRequest = async (req, res) => {
    const { requestid, response } = req.body;
    //check if requestid and response are present
    if (!requestid || !response) return res.status(400).json({ 'success': false, message: 'Bad request' });

    try {
        //fetch request from database
        const request = await prisma.request.findUnique({
            where: {
                requestid: requestid
            }
        })
        //check if request exists
        if (!request) return res.sendStatus(404);
        //check if request is of type update and entity is child
        if (request.type !== 'update' || request.entity !== 'child' || request.status === 'approved' || request.status === 'rejected') return res.status(400).json({ 'success': false, message: 'Bad request' });
        //check if user is authorized to handle request
        if (request.receiver !== req.userId) return res.status(401).json({ 'success': false, message: 'Unauthorized' });
        //if request is accepted, update child
        if (response === 'approved') {
            req.body = request.request;
            const result = await updateChild(req);
            if (result === 500) return res.status(result).json({ 'success': false, message: 'An error occurred' });
            else if (result === 401) return res.status(result).json({ 'success': false, message: 'Unauthorized' });
            else if (result === 404) return res.status(result).json({ 'success': false, message: 'Resource not found' });
        }
        //update request with response
        const updatedRequest = await prisma.request.update({
            where: {
                requestid: requestid
            },
            data: {
                status: response
            },
            select: {
                requestid: true,
                type: true,
                entity: true,
                status: true,
                created_at: true
            }
        })

        res.status(200).json({ success: true, data: updatedRequest });

    } catch (error) {
        console.error('Database query failed:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred '
        });
    }
}

const createDeleteChildRequest = async (req, res) => {
    const { childid } = req.body;
    try {
        const child = await prisma.child.findUnique({
            where: {
                childid: childid
            },
            select: { orphanageid: true }
        })

        if (!child) return res.status(404).json({
            success: false,
            message: 'Resource not found'
        });

        if ((!req.orphanageid) || (child.orphanageid !== req.orphanageid)) return res.status(401).json({
            success: false,
            message: 'Unauthorized'
        });

        const orphanage = await prisma.orphanage.findUnique({
            where: {
                orphanageid: child.orphanageid
            },
            select: { headid: true }
        })

        if (!orphanage) return res.status(404).json({
            success: false,
            message: 'Resource not found'
        });

        const newRequest = await prisma.request.create({
            data: {
                type: 'delete',
                entity: 'child',
                request: req.body,
                receiver: orphanage.headid,
                sender: req.userId
            },
            select: {
                requestid: true,
                type: true,
                entity: true,
                status: true,
                created_at: true
            }
        })

        res.status(200).json({
            success: true,
            message: 'Request created successfully.',
            data: newRequest
        })

    } catch (error) {
        console.error('Database query failed:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while creating request.'
        });
    }
}

const handleDeleteChildRequest = async (req, res) => {
    const { requestid, response } = req.body;
    //check if requestid and response are present
    if (!requestid || !response) return res.status(400).json({ 'success': false, message: 'Bad Request' });

    try {
        //fetch request from database
        const request = await prisma.request.findUnique({
            where: {
                requestid: requestid
            }
        })
        //check if request exists
        if (!request) return res.status(404).json({ 'success': false, message: 'Resource not found' });
        //check if request is of type delete and entity is child
        if (request.type !== 'delete' || request.entity !== 'child' || request.status === 'approved' || request.status === 'rejected') return res.sendStatus(400);
        //check if user is authorized to handle request
        if (request.receiver !== req.userId) return res.status(401).json({ 'success': false, message: 'Unauthorized' });
        //if request is accepted, delete child
        if (response === 'approved') {
            req.body = request.request;
            const result = await deleteChild(req);
            if (result === 500) return res.status(result).json({ 'success': false, message: 'An error occurred' });
            else if (result === 404) return res.status(result).json({ 'success': false, message: 'Resource not found' });
        }
        //update request with response
        const updatedRequest = await prisma.request.update({
            where: {
                requestid: requestid
            },
            data: {
                status: response
            },
            select: {
                requestid: true,
                type: true,
                entity: true,
                status: true,
                created_at: true
            }
        })

        res.status(200).json({ success: true, data: updatedRequest });
    } catch (error) {
        console.error('Database query failed:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred'
        });
    }
}
module.exports = {
    getRequest,
    createAddChildRequest,
    handleAddChildRequest,
    createEditChildRequest,
    handleEditChildRequest,
    createDeleteChildRequest,
    handleDeleteChildRequest,
    getSentRequests,
    getReceivedRequests
};
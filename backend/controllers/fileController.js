const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { client, s3 } = require('../config/s3Client');
const { PutObjectCommand } = require('@aws-sdk/client-s3');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getChildPhotoUploadURL = async (req, res) => {

    const requestId = req.params.path.split('.')[0];
    const type = req.params.path.split('.')[1];
    const userId = req.userId;

    if (!requestId || !type) return res.status(400).json({
        success: false,
        message: 'Invalid request'
    });

    try {
        const request = await prisma.request.findUnique({
            where: {
                requestid: requestId
            },
            select: {
                sender: true
            }
        })

        if (!request) return res.status(404).json({
            success: false,
            message: 'Request not found'
        });

        if (request.sender !== userId) return res.status(401).json({
            success: false,
            message: 'Unauthorized'
        });

        const URL = await getSignedUrl(
            client,
            new PutObjectCommand({
                Bucket: process.env.S3_BUCKET,
                Key: `request/${requestId}.${type}`,
            }),
            { expiresIn: 1000 * 60 });

        if (URL) {
            res.status(200).json({
                success: true,
                URL
            });
            console.log('URL:', URL);
        } else throw new Error('Failed to get upload URL');

    } catch (error) {
        console.error('Error getting upload URL:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get upload URL'
        });
    }
}

const getChildDocUploadURL = async (req, res) => {

    const documentId = req.params.path.split('.')[0];
    const type = req.params.path.split('.')[1];
    const orphanageId = req.orphanageid;

    if (!documentId || !type) return res.status(400).json({
        success: false,
        message: 'Invalid request'
    });

    try {
        const document = await prisma.child_document.findUnique({
            where: {
                documentid: documentId
            },
            include: {
                child: {
                    include: {
                        orphanage: true
                    }
                }
            }
        })

        if (!document) {
            return res.status(404).json({
                success: false,
                message: 'Document not found'
            });
        }

        if (!orphanageId || document.child.orphanage.orphanageid !== orphanageId) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            });
        }

        const URL = await getSignedUrl(
            client,
            new PutObjectCommand({
                Bucket: process.env.S3_BUCKET,
                Key: `child/document/${documentId}.${type}`,
            }),
            { expiresIn: 1000 * 60 });

        if (URL) {
            res.status(200).json({
                success: true,
                URL
            });
            console.log('URL:', URL);
        } else throw new Error('Failed to get upload URL');

    } catch (error) {
        console.error('Error getting upload URL:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get upload URL'
        });
    }
}

/// Move a file from one location to another in S3
const moveFileInS3 = async (sourceKey, destinationKey) => {
    const bucketName = process.env.S3_BUCKET;

    // Step 1: Copy the object to the new location
    await s3.copyObject({
        Bucket: bucketName,
        CopySource: `${bucketName}/${sourceKey}`,
        Key: destinationKey
    }).promise();

    console.log(`File copied from ${sourceKey} to ${destinationKey}`);

    // Step 2: Delete the original object
    await s3.deleteObject({
        Bucket: bucketName,
        Key: sourceKey
    }).promise();

    console.log(`File deleted from ${sourceKey}`);

}

module.exports = { getChildPhotoUploadURL, getChildDocUploadURL, moveFileInS3 };
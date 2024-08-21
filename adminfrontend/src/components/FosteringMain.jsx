import React, { useState } from "react";
import Navbar from "./Navbar";
import Carousel from "./Carousel";
import { slideImages } from "../constants";

export default function FosteringMain() {
  return (
    <div>
      <Navbar />
      <aside
        id="cta-button-sidebar"
        class="fixed top-20 left-0 z-40 w-80 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul class="space-y-2 font-medium">
            <li>
              <a
                href="/fostering"
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                Fostering Application
              </a>
            </li>
            <li>
              <a
                href="/myapplications"
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                Applications
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                Inbox
              </a>
            </li>
          </ul>
        </div>
      </aside>
      <div className="flex">
        <div class="pt-32  dark:bg-gray-800 pl-96 w-3/4 pr-16">
          <h2 class="font-heading dark:text-gray-100 mb-8 text-3xl font-bold lg:text-4xl">
            Steps to Foster Child
          </h2>
          <div class="flex">
            <div class="flex flex-col items-center">
              <div>
                <div class="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="h-6 w-6 text-primary dark:text-slate-200"
                  >
                    <path d="M12 5l0 14"></path>
                    <path d="M18 13l-6 6"></path>
                    <path d="M6 13l6 6"></path>
                  </svg>
                </div>
              </div>
              <div class="h-full w-px bg-gray-300 dark:bg-slate-500"></div>
            </div>
            <div class="pt-1 pb-8">
              <p class="mb-2 text-xl font-bold text-gray-900 dark:text-slate-300">
                Step 1: Is adoption suitable for you?
              </p>
              <p class="text-gray-600 dark:text-slate-400">
                Why do you want to adopt? Can you prioritise your child’s needs?
                fill the fostering application and answer the all the
                question....
              </p>
            </div>
          </div>

          <div class="flex">
            <div class="mr-4 flex flex-col items-center">
              <div>
                <div class="flex h-10 w-10 items-center justify-center rounded-full border-2  border-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="h-6 w-6 text-primary dark:text-slate-200"
                  >
                    <path d="M12 5l0 14"></path>
                    <path d="M18 13l-6 6"></path>
                    <path d="M6 13l6 6"></path>
                  </svg>
                </div>
              </div>
              <div class="h-full w-px bg-gray-300 dark:bg-slate-500"></div>
            </div>
            <div class="pt-1 pb-8">
              <p class="mb-2 text-xl font-bold text-gray-900 dark:text-slate-300">
                Step 2: Check your Notification Box If accepted Continue....
              </p>
              <p class="text-gray-600 dark:text-slate-400">
                Are you eligible to adopt?...If you are OK with the proceedings
                submit necessary documents for the next steps
              </p>
            </div>
          </div>

          <div class="flex">
            <div class="mr-4 flex flex-col items-center">
              <div>
                <div class="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="h-6 w-6  text-primary dark:text-slate-200"
                  >
                    <path d="M12 5l0 14"></path>
                    <path d="M18 13l-6 6"></path>
                    <path d="M6 13l6 6"></path>
                  </svg>
                </div>
              </div>
              <div class="h-full w-px bg-gray-300 dark:bg-slate-500"></div>
            </div>
            <div class="pt-1 pb-8">
              <p class="mb-2 text-xl font-bold text-gray-900 dark:text-slate-300">
                Step 3: Check Your Notification Box again If Accepted Choose
                wisely suitable children for you and submit the Documents
              </p>
              <p class="text-gray-600 dark:text-slate-400">
                Check Convienient time to have a virtual meeting with the Socia
                Worker for the poceedings
              </p>
            </div>
          </div>

          <div class="flex">
            <div class="mr-4 flex flex-col items-center">
              <div>
                <div class="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="h-6 w-6  text-primary dark:text-slate-200"
                  >
                    <path d="M12 5l0 14"></path>
                    <path d="M18 13l-6 6"></path>
                    <path d="M6 13l6 6"></path>
                  </svg>
                </div>
              </div>
              <div class="h-full w-px bg-gray-300 dark:bg-slate-500"></div>
            </div>
            <div class="pt-1 pb-8">
              <p class="mb-2 text-xl font-bold text-gray-900 dark:text-slate-300">
                Step 4: Check Your Notification Box again Have a physical
                Meeting with Social Worker and the child
              </p>
              <p class="text-gray-600 dark:text-slate-400">
                IF OK arrange a physical meeting with the the Social worker and
                the children at the Orphanage
              </p>
            </div>
          </div>

          <div class="flex">
            <div class="mr-4 flex flex-col items-center">
              <div>
                <div class="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="h-6 w-6 text-white dark:text-slate-200"
                  >
                    <path d="M5 12l5 5l10 -10"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div class="pt-1 ">
              <p class="mb-2 text-xl font-bold text-gray-900 dark:text-slate-300">
                OK proceed the with the next proceedings and reqularly meeting
                once a two weeks
              </p>
            </div>
          </div>
        </div>
      <div className="flex w-1/2">
            <Carousel images={slideImages} />
          </div>
      </div>
    </div>
  );
}

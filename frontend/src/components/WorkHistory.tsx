'use client';
import { timeline } from '@/constants/timeline';
import React from 'react';
import { Paragraph } from './Paragraph';
import { Heading } from './Heading';
import {
  IconCircleCheckFilled,
} from '@tabler/icons-react';

export const WorkHistory = () => {
  return (
    <div>
      {timeline.map((item, index) => (
        <div
          className="flex flex-col md:flex-col space-y-10 md:space-y-0 space-x-10 my-20 "
          key={`timeline-${index}`}
        >
          <div>
            <Heading
              as="h5"
              className="text-lg md:text-lg lg:text-lg text-emerald-500 flex justify-between"
            >
              {item.company} 
              <Paragraph>{item.date}</Paragraph>
            </Heading>
            <Paragraph className="text-base md:text-base lg:text-base font-semibold">
              {item.title}
            </Paragraph>
            <Paragraph className="text-sm md:text-sm lg:text-sm mb-4">
              {item.department}
            </Paragraph>

            {item.responsibilities.map((responsibility, index) => (
              <Step key={responsibility}>{responsibility}</Step>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const Step = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex space-x-1 items-start my-2">
      <IconCircleCheckFilled className="h-3 w-4 mt-1 text-neutral-300" />
      <Paragraph className="text-sm md:text-sm lg:text-sm text-justify">
        {children}
      </Paragraph>
    </div>
  );
};

"use client";

import React, { useEffect } from 'react'
import { formStatus, useFullSlicedStore } from '../_states/useFullSlicedStore';
import { type GroupType } from '../_hooks/useGroupHandler';
import { Accordion, AccordionItem } from '@nextui-org/accordion';
import { type Group } from '../_states/groupsStore';
import { cn } from '@nextui-org/theme';

function Groups({ groups }: { groups: GroupType[] }) {
  const { currentGroup, setCurrentGroup, } = useFullSlicedStore();

  useEffect(() => {
    if(currentGroup.length <= 0) setCurrentGroup(["0"]);
  }, [setCurrentGroup]);

  return (
    <Accordion
    selectedKeys={currentGroup}
    variant="splitted"
    onSelectionChange={(key) => setCurrentGroup(Array.from(key) as Group)}
  >
    {groups.map((group, idx) => (
      <AccordionItem key={idx} title={group.title} subtitle={<group.subtitle />} classNames={{
        heading: cn("px-4 bg-content1 shadow-medium rounded-medium", {
          "bg-green-100": group.formStatus === formStatus.Completed,
          "bg-yellow-100": group.formStatus === formStatus.InProgress,
          "bg-red-100": group.formStatus === formStatus.Pending
        }),
        base: "px-0 bg-content1",
        content: "px-4 bg-content1",
      }}>
        <group.content />
      </AccordionItem>
    ))}
  </Accordion>
  )
}

export default Groups
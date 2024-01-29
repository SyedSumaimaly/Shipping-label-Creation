
'use client';

import { Dropdown } from 'flowbite-react';

function Component() {
  return (
    <Dropdown label="Dropdown button">
      <Dropdown.Item>UPS Air</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item>UPS Ground</Dropdown.Item>
    </Dropdown>
  );
}

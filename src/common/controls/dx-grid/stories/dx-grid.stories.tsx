import React from 'react';
import { Meta } from '@storybook/react';
import Chance from 'chance';
import DxGrid from '../index';

const chance = new Chance();

export default {
  title: 'Application/common controls/DxGrid/DxGrid',
  component: DxGrid,
} as Meta;

const Template = (args: any) => (<DxGrid {...args} />);

export const Default = Template.bind({});

const cols = [
  { name: 'userId', title: 'User Id' },
  { name: 'fName', title: 'First Name' },
  { name: 'lName', title: 'Last Name' },
  { name: 'profession', title: 'Profession' },
];

const getRows = () => {
  const rows: any[] = [];
  for (let i = 0; i < chance.integer({ min: 30, max: 250 }); i++) {
    rows.push({
      userId: chance.integer({ min: 1, max: 100000 }),
      fName: chance.first(),
      lName: chance.last(),
      profession: chance.profession(),
    });
  }
  return rows;
};

Default.args = {
  columns: cols,
  rows: getRows(),
};

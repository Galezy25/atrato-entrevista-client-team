import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ReactNode } from 'react';
import {
  NavBar,
  NavBarCenter,
  NavBarLeft,
  NavBarRight,
} from '../../components/NavBar';

type StoriesNavBar = (props: {
  childenNavBar: ReactNode | undefined;
  childenCenter: ReactNode | undefined;
  childenLeft: ReactNode | undefined;
  childenRight: ReactNode | undefined;
}) => JSX.Element;

export default {
  title: 'Components/NavBar',
  component: NavBar,
} as ComponentMeta<StoriesNavBar>;

const Template: ComponentStory<StoriesNavBar> = (args) => (
  <>
    <NavBar>{args.childenNavBar}</NavBar>
    <NavBarCenter>{args.childenCenter}</NavBarCenter>{' '}
    <NavBarLeft>{args.childenLeft}</NavBarLeft>
    <NavBarRight>{args.childenRight}</NavBarRight>
  </>
);

export const Example = Template.bind({});
Example.args = {
  childenCenter: 'Center',
  childenRight: 'Right',
  childenLeft: 'Left',
  childenNavBar: 'NavBar',
};

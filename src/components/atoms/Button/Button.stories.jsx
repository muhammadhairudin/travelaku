import Button from './index';

export default {
  title: 'Components/Atoms/Button',
  component: Button,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline']
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg']
    }
  }
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Primary Button',
  variant: 'primary'
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Secondary Button',
  variant: 'secondary'
};

export const Outline = Template.bind({});
Outline.args = {
  children: 'Outline Button',
  variant: 'outline'
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small Button',
  size: 'sm'
};

export const Medium = Template.bind({});
Medium.args = {
  children: 'Medium Button',
  size: 'md'
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large Button',
  size: 'lg'
}; 
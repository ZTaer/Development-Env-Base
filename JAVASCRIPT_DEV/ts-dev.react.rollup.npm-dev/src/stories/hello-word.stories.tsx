import React from 'react';
import { storiesOf } from '@storybook/react';

import HelloWord from '../components/hello-word';

const stories = storiesOf('Component Test | 组件根节点', module);
stories.add('Component | 组件子节点', () => <HelloWord />);

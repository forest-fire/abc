import { suite } from 'uvu';
import * as assert from 'uvu/assert';
import { Product, Customer } from '../models';

const vegemitePlugin = suite('Vegemite Plugin Integration');

vegemitePlugin.skip('state: store API includes proper initial state', async () => {});
vegemitePlugin.skip('state: bespoke handler is dispatched and changes state', async () => {});
vegemitePlugin.skip('state: dispatching ABC event triggers state change in correct model', async () => {});
vegemitePlugin.skip('', async () => {});
vegemitePlugin.skip('', async () => {});
vegemitePlugin.skip('abc: expressing bespoke moduleName directs change to appropriate path', async () => {});
vegemitePlugin.skip('abc: singular model exports proper symbols', async () => {});
vegemitePlugin.skip('abc: list-based model exports proper symbols', async () => {});
vegemitePlugin.skip('', async () => {});

vegemitePlugin.run();

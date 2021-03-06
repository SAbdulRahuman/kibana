/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { SIGNALS_INDEX_KEY } from '../../common/constants';
import { createMockConfig } from '../lib/detection_engine/routes/__mocks__';
import { SiemClient } from './client';

describe('SiemClient', () => {
  describe('#signalsIndex', () => {
    it('returns the index scoped to the specified spaceId', () => {
      const mockConfig = {
        ...createMockConfig(),
        [SIGNALS_INDEX_KEY]: 'mockSignalsIndex',
      };
      const spaceId = 'fooSpace';
      const client = new SiemClient(spaceId, mockConfig);

      expect(client.signalsIndex).toEqual('mockSignalsIndex-fooSpace');
    });
  });
});

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import uuid from 'uuid';
import { range } from 'lodash';
import { AlertType } from '../../../../x-pack/plugins/alerting/server';
import { DEFAULT_INSTANCES_TO_GENERATE } from '../../common/constants';

export const alertType: AlertType = {
  id: 'example.always-firing',
  name: 'Always firing',
  actionGroups: [{ id: 'default', name: 'default' }],
  defaultActionGroupId: 'default',
  async executor({ services, params: { instances = DEFAULT_INSTANCES_TO_GENERATE }, state }) {
    const count = (state.count ?? 0) + 1;

    range(instances)
      .map(() => ({ id: uuid.v4() }))
      .forEach((instance: { id: string }) => {
        services
          .alertInstanceFactory(instance.id)
          .replaceState({ triggerdOnCycle: count })
          .scheduleActions('default');
      });

    return {
      count,
    };
  },
};

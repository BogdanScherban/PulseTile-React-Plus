import { createSelector } from 'reselect';
import _ from 'lodash/fp';

import { operationsOnCollection } from '../../../utils/plugin-helpers.utils';
import { valuesNames } from './forms.config';

const proceduresCreateFormSelector = _.getOr({}, 'form.proceduresCreateFormSelector');
const proceduresDetailFormSelector = _.getOr({}, 'form.proceduresDetailFormSelector');
const metaPanelFormSelector = _.getOr({}, 'form.metaPanelFormSelector');

const patientProceduresSelector = createSelector(
  ({ patientsProcedures }) => patientsProcedures,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (patientsProcedures, userId) => {
    let allProcedures = operationsOnCollection.modificateDateForTable(patientsProcedures[userId], valuesNames.DATE_OF_PROCEDURE)
    allProcedures = operationsOnCollection.modificateDateForTable(allProcedures, valuesNames.TIME)
    return ({ allProcedures, userId });
  }
);

const proceduresDetailFormStateSelector = createSelector(proceduresDetailFormSelector,
  proceduresDetailFormState => ({ proceduresDetailFormState }));

const proceduresCreateFormStateSelector = createSelector(proceduresCreateFormSelector,
  proceduresCreateFormState => ({ proceduresCreateFormState }));

const metaPanelFormStateSelector = createSelector(metaPanelFormSelector,
  metaPanelFormState => ({ metaPanelFormState }));

const patientProceduresDetailSelector = createSelector(
  ({ proceduresDetail }) => proceduresDetail,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (proceduresDetail, userId) => {
    const procedureDetail = proceduresDetail[userId];
    return ({ procedureDetail, userId });
  }
);

export { patientProceduresSelector, proceduresDetailFormStateSelector, proceduresCreateFormStateSelector, metaPanelFormStateSelector, patientProceduresDetailSelector }

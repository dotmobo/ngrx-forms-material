import { Action } from '@ngrx/store';
import {
  box,
  createFormStateReducerWithUpdate,
  updateGroup,
  validate,
} from 'ngrx-forms';
import { createNgrxFormAdapter, NgrxFormState } from 'ngrx-forms-material';
import { required } from 'ngrx-forms/validation';
import { MyDomain } from '../../models/my-domain.model';

export const MY_DOMAIN_FORM_ID = 'MY-DOMAIN-FORM-ID';

/**
 * You can use this field to get information from an API.
 * And then, synchronize it with the form.
 */
const initData: MyDomain = {
  birthDate: '1985-06-05',
  fruit: 'F1',
  vegetables: box(['V1', 'V2']),
  birthCountry: 'C1',
};

export const formAdapter = createNgrxFormAdapter<MyDomain>(
  MY_DOMAIN_FORM_ID,
  initData
);
export const initialState = formAdapter.getInitialState({
  id: MY_DOMAIN_FORM_ID,
  data: initData,
});

export const formStateReducer = createFormStateReducerWithUpdate<MyDomain>(
  updateGroup<MyDomain>({
    birthDate: (controlState) => validate(controlState, required),
    birthCountry: (controlState) => validate(controlState, required),
    fruit: (controlState) => validate(controlState, required),
  })
);

export function reducer(
  state: NgrxFormState<MyDomain> = initialState,
  action: Action
): NgrxFormState<MyDomain> {
  const form = formStateReducer(state.form, action);
  if (form !== state.form) {
    state = { ...state, form: form };
  }
  return state;
}
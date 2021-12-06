import { createAction, props } from '@ngrx/store';

export const analyticsChanged = createAction('[Analytics] analytics changed');

export const setFromDate = createAction('[Analytics] set from', props<{ fromDate: Date }>());

export const setToDate = createAction('[Analytics] set to', props<{ toDate: Date }>());

export const setFromAndToDate = createAction('[Analytics] set from', props<{ fromDate: Date; toDate: Date }>());

export const resetState = createAction('[Analytics] initialize state');

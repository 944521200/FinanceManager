import { createAction, props } from '@ngrx/store';

export const overrideAnalyticsSettings = createAction(
    '[Analytics] override settings (IMPORT)',
    props<{
        settings: { fromDate: Date; toDate: Date };
    }>(),
);

export const analyticsChanged = createAction('[Analytics] analytics changed');

export const setFromAndToDate = createAction('[Analytics] set from', props<{ fromDate: Date; toDate: Date }>());

export const resetState = createAction('[Analytics] initialize state');

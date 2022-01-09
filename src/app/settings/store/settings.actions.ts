import { createAction, props } from '@ngrx/store';

export const setNightMode = createAction('[Settings] toggle nightmode', props<{ darkMode: boolean }>());
export const settingsChanged = createAction('[Settings] save settings');

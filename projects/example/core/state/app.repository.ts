import {createStore, withProps} from '@ngneat/elf';
import {AuthState} from "auth";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AppProps extends Partial<AuthState> {
}

export const store = createStore({name: 'app'}, withProps<AppProps>({isLogged: false}));


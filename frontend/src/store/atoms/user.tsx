import { atom } from "recoil"
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const userState = atom({
        key: 'userState',
        default: false ,
        effects_UNSTABLE: [persistAtom],
})

export const usernameState = atom({
        key: 'usernameState',
        default  : '' ,
        effects_UNSTABLE: [persistAtom],
})
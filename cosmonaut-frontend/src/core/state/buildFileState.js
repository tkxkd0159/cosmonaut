import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "buildFile",
  storage: sessionStorage,
});

export const buildFileState = atom({
  key: "buildFiles",
  default: {},
  effects_UNSTABLE: [persistAtom],
});

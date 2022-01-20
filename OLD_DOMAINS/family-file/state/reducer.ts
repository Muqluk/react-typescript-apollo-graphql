import produce from 'immer';
import FamilyFileUser from '../models/family-file-user';
import { ActionTypes, FamilyFileAction } from './actions';

export type FamilyFileState = {
  readonly UsersLoading: boolean;
  readonly UsersHadLoaded: boolean;
  readonly FamilyFileUsers: FamilyFileUser[];
  readonly FetchFamilyFileUserErrors: string | string[] | null;
};

const initialState: FamilyFileState = Object.freeze({
  UsersLoading: false,
  UsersHadLoaded: false,
  FamilyFileUsers: [],
  FetchFamilyFileUserErrors: null,
});

export const FamilyFileUserReducer = (
  state: FamilyFileState = initialState,
  action: FamilyFileAction
) => produce(state, (draft) => {
  const newDraft = draft;

  switch (action.type) {
    case ActionTypes.FETCH_FAMILYFILE_USERS_REQUEST:
      newDraft.UsersHadLoaded = false;
      newDraft.UsersLoading = true;
      newDraft.FamilyFileUsers = [];
      break;
    case ActionTypes.FETCH_FAMILYFILE_USERS_SUCCESS:
      newDraft.UsersHadLoaded = true;
      newDraft.UsersLoading = false;
      newDraft.FamilyFileUsers = action.payload;
      break;
    case ActionTypes.FETCH_FAMILYFILE_USERS_FAIL:
      newDraft.UsersHadLoaded = false;
      newDraft.UsersLoading = false;
      newDraft.FetchFamilyFileUserErrors = action.payload;
      break;
    default:
      break;
  }
});

import { putItem, patchItem } from '../../assets/js/pouchdb';

const state = {
  activePageType: '',
  activePageIndex: '',
  activePageHeader: '',
  activePageContent: {},
  activePageId: '',
};

const getters = {
  getActivePageType: state => state.activePageType,
  getActivePageIndex: state => state.activePageIndex,
  getActivePageHeader: state => state.activePageHeader,
  getActivePageContent: state => state.activePageContent,
  getActivePageId: state => state.activePageId,
};

const mutations = {
  UPDATE_ACTIVE_PAGE_TYPE(state, val) {
    state.activePageType = val;
  },
  UPDATE_ACTIVE_PAGE_INDEX(state, val) {
    state.activePageIndex = val;
  },
  UPDATE_ACTIVE_PAGE_HEADER(state, val) {
    state.activePageHeader = val;
  },
  UPDATE_ACTIVE_PAGE_CONTENT(state, val) {
    state.activePageContent = val;
  },
  UPDATE_ACTIVE_PAGE_ID(state, val) {
    state.activePageId = val;
  },
};

const actions = {
  updateActivePage(context, data) {
    context.commit('UPDATE_ACTIVE_PAGE_TYPE', data.type);
    context.commit('UPDATE_ACTIVE_PAGE_INDEX', data.index);
    context.commit('UPDATE_ACTIVE_PAGE_HEADER', data.header);
    context.commit('UPDATE_ACTIVE_PAGE_CONTENT', data.content);
    context.commit('UPDATE_ACTIVE_PAGE_ID', data._id);
  },
  async addActivePageContentItem({ commit, state }, item) {
    const docId = state.activePageId;
    await putItem(docId, item);

    if (putItem) {
      const items = [
        ...state.activePageContent.items,
        item,
      ];
      const content = {
        ...state.activePageContent,
        items,
      };
      commit('UPDATE_ACTIVE_PAGE_CONTENT', content);
    }
  },
  async toggleActivePageContentTask({ state, commit }, { patchedItem, itemIndex }) {
    const docId = state.activePageId;
    await patchItem(docId, patchedItem, itemIndex);

    if (patchItem) {
      const items = state.activePageContent.items.map((item, index) => {
        if (index !== itemIndex) { return item; }
        return patchedItem;
      });
      const content = {
        ...state.activePageContent,
        items,
      };
      commit('UPDATE_ACTIVE_PAGE_CONTENT', content);
    }
  },
  async updateActivePageContentItemDay({ state }, { patchedItem, itemIndex }) {
    const docId = state.activePageId;
    await patchItem(docId, patchedItem, itemIndex);
  },
};


export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
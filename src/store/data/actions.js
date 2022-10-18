/*
export function someAction (context) {
}
*/

export const removeCategoryFromParentsAndDeleteIt = (
  { state, commit },
  payload
) => {
  // remove category from all folders
  let data = { parents: payload.parents, child: payload.child };
  commit("removeChildFromAllParents", data);
  let categories;

  // deleting category
  console.log("TYPE: ", payload.type);
  if (payload.type === "DIARY") {
    categories = state.categoriesForDiary;
    console.log("D ", categories);
  } else {
    categories = state.categoriesForEvents;
    console.log("E ", categories);
  }
  console.log("inside action: ", categories);
  data = { categoryToDelete: payload.child, categories: categories };
  commit("deleteCategory", data);
};

export function removeTemplateFromParentsAndDeleteIt(context, payload) {
  // remove template from all categories
  let data = { parents: payload.parents, child: payload.child };
  context.commit("removeChildFromAllParents", data);

  // deleting template
  let templateList = context.getters.getTemplatesByType(payload.type);
  data = { templateToDelete: payload.child, templates: templateList };
  context.commit("deleteTemplate", data);
}

/*
export function someAction (context) {
}
*/

export const removeCategoryFromParentsAndDeleteIt = (context, payload) => {
  // remove category from all folders
  let data = { parents: payload.parents, child: payload.child };
  context.commit("removeChildFromAllParents", data);

  // deleting category
  let categories = context.getters.getCategoryByType(payload.type);
  data = { categoryToDelete: payload.child, categories: categories };
  context.commit("deleteCategory", data);
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

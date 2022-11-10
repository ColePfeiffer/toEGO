export const removeCategoryFromParentsAndDeleteIt = (
  { state, commit },
  payload
) => {
  // remove category from all folders
  let data = { parents: payload.parents, child: payload.child };
  commit("removeChildFromAllParents", data);
  let categories;

  // deleting category
  if (payload.type === "DIARY") {
    categories = state.categoriesForDiary;
  } else {
    categories = state.categoriesForEvents;
  }
  data = { categoryToDelete: payload.child, categories: categories };
  commit("deleteCategory", data);
};

export function updateTemplate(context, payload) {
  let data = { type: payload.type, templateID: payload.templateID };
  let template = context.getters.getTemplateByID(data);
  data = {};
  data = { name: payload.name, text: payload.text, template: template };
  context.commit("updateTemplate", data);
}

export function removeTemplateFromParentsAndDeleteIt(context, payload) {
  // remove template from all categories
  let data = { parents: payload.parents, child: payload.child };
  context.commit("removeChildFromAllParents", data);

  // deleting template
  let templateList = context.getters.getTemplatesByType(payload.type);
  data = { templateToDelete: payload.child, templates: templateList };
  context.commit("deleteTemplate", data);
}

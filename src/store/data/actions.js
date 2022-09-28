/*
export function someAction (context) {
}
*/

export const removeCategoryFromParentsAndDeleteIt = (context, payload) => {
  // remove item from all categories
  let data = { parents: payload.parents, child: payload.child };
  context.commit("removeChildFromAllParents2", data);
  // context.commit

  // delete
  data = { categoryToDelete: payload.child, type: payload.type };
  //this.$store.commit("data/deleteCategory", payload);
};

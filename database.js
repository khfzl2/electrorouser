const websites = [], users = [], emails = [], docs = [], sheets = [], slides = [], classrooms=[];
const searchIndex = {}; // Could be Elasticlunr/SQlite/Algolia/Elastic etc.

module.exports = {
  websites, users, emails, docs, sheets, slides, classrooms,
  search(q) {
    // Simple demo: filter by substring in name/content
    return [
      ...websites.filter(w=>w.domain.includes(q)||w.code.includes(q)),
      ...users.filter(u=>u.email.includes(q)),
      ...emails.filter(e=>e.subject.includes(q)||e.text.includes(q)),
      ...docs.filter(d=>d.title.includes(q)||d.text.includes(q)),
      // repeat for sheets/slides/classrooms
    ]
  }
};
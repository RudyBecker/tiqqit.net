json.id @ticket.id
json.title @ticket.title
json.project_cat @ticket.project_cat
json.prob_cat @ticket.prob_cat
json.priority @ticket.priority
json.desc @ticket.desc
json.status @ticket.status
json.due_date @ticket.due_date
json.user_email @ticket.user.email
json.image_url polymorphic_url(@ticket.image) if @ticket.image.attached?
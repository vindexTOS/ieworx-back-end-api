## ADMIN ROUTES

### route '/admin/login/'  (POST method, status 200)
**Body**: { password, email }
**Response**: { token, user }

### route '/email/contact/'  (GET method, status 200)
**Query**: 
```javascript
const queryParams = new URLSearchParams({
  page: page,
  limit: limit,
  searchType: searchType,
  search: search,
}).toString()
Route: '/email/contact/${queryParams}'
Response: { emailData, totalPages, totalEmail }

route '/auth/userGet' (GET method, status 200)
Response: { msg }

CONTACT FORM
route '/email/contact/' (POST method, status 200)
Body: { name, email, number, message, activity }

USER AUTH
route '/auth/register/' (POST method, status 200)
Body: { email, password, repetPassword, userName, fullName }
(sending photo file from form)
const form = e.currentTarget
const obj = new FormData(form)
obj.append('avatar', image)
Response: { token, user }
(if error: { message })

route '/auth/login/' (POST method, status 200)
Body: { email, password }
Response: { token, user }

 
 
```
  

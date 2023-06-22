API documentation 1.0 


``` 
###ADMIN ROUTES
 ##route '/admin/login/  method  post status 200 : {token, user}  
 body {password, email} 


 ##route '/email/contact/'  method  get status 200 : {emailData,totalPages,totalEmail}
  query: const queryParams = new URLSearchParams({
    page: page,
    limit: limit,
    searchType: searchType,
    search: search,
    }).toString()
  '/email/contact/${queryParams}' adding querys to route 
  
  ##route '/auth/userGet'  method get status 200 :  {msg}
  body { name, email, number, message, activity } 
  
  
  
  ###CONTACT FORM 
  ##route '/email/contact/' method post status 200 : 


 ###USER AUTH 
 ##route '/auth/register/' method post status 200 : {token,user}  if error : {message}
 body { email, password, repetPassword, userName, fullName } +
 sending photo file from form 
   const form = e.currentTarget
    const obj = new FormData(form)
    obj.append('avatar', image)
 
  ##route '/auth/login/' method post status 200 : {token,user}  
  body { email, password }

 
 
```
  

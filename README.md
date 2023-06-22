API documentation 1.0 


``` 
 route '/admin/login/  post method status 200 : {token, user}  
 body {password, email} 


 route '/email/contact/'  get method status 200 : {emailData,totalPages,totalEmail}
  query: const queryParams = new URLSearchParams({
    page: page,
    limit: limit,
    searchType: searchType,
    search: search,
    }).toString()
  '/email/contact/${queryParams}' adding querys to route 
  
```
  

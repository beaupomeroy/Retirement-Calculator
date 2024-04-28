# Retirement Calculator

## MVP features

- Calculate retirement based on input information
- Save result
- Delete result
- Get a random inspiring retirement quote
- resetting input and result
- How to use page
- Send message in contact form

## Wireframe

[figma link](https://www.figma.com/file/03AoilM3D3bgHr6gYSj6od/Retirement-Calculator?type=whiteboard&node-id=0-1&t=XUlFsLSmPQLv4coX-0)

## Endpoints

### Built the server with NODE JS and EXPRESS with different endpoints to Create, Read, and Delete data

- **GET** /api/quote - Calculates results from the information inputted by the user

- **POST** /api/createRetirement- When user clicks "saved result", the input data and result gets listed in the saved results section

- **DELETE** /api/delete/:index - When X icon is clicked in the saved result section, this allows user to delete it

## Dependencies and Third party tools

- Bootstrap
- Axios
- FormSubmit
- Express
- Cors

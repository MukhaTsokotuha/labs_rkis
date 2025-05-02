function _elem(sel){
    return document.querySelector(sel)
}
//#region Переменные
const HOST = 'http://web-app.api-web-tech.local';
const CONTEXT = _elem('.content')
var TOKEN='';
var Email ='';

var EddFile = {}
//#endregion
//#region AJAX Function
function _get(params, callback){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', params.url)
    xhr.send()

    xhr.onreadystatechange = function(){
        if (xhr.readyState==4){
            callback(xhr.responseText)
        }
    }
}

function _post(params, callback){
    let xhr = new XMLHttpRequest();
    xhr.open('POST', `${params.url}`)
    xhr.send(params.data)

    xhr.onreadystatechange = function(){
        if (xhr.readyState==4){
            callback(xhr.responseText)
        }
    }
}

function _load(url, element, callback){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url)
    xhr.send()

    xhr.onreadystatechange = function(){
        if (xhr.readyState==4){
            element.innerHTML = xhr.responseText;
            if (callback){
                callback()
            }
        }
    }
}
//#endregion

_load('/modules/authorization.html', CONTEXT, onLoadAuth)
//_load('/modules/profile.html', CONTEXT, UserFiles)
//_load('/modules/upload.html', CONTEXT, UploadFiles)
//_load('/modules/registration.html', CONTEXT, doReg)


//#region UnAuth User
function onLoadAuth(){
    _elem('.go-register').addEventListener('click', function(){
        _load('/modules/registration.html',CONTEXT, doReg)
    })

    _elem('.authorize').addEventListener('click', function(){
        let req_data = new FormData();
        Email = _elem('input[name="email"]').value;

        req_data.append('email', _elem('input[name="email"]').value)
        req_data.append('password', _elem('input[name="password"]').value)
        
        _post({url:`${HOST}/authorization/`, data: req_data},function(response){
            response = JSON.parse(response)
            console.log(response)
            if (response.success){
                
                TOKEN = response.token;
                console.log(TOKEN)
                _load('/modules/profile.html', CONTEXT, UserFiles)
            }else{
                _elem('.message--block').innerHTML = ''
                _elem('.message--block').append(response.message)
            }
        })
    })
}

function doReg(){
    _elem('.register').addEventListener('click', function(){
        let req_data = new FormData();
        req_data.append('email', _elem('input[name="email"]').value)
        req_data.append('password', _elem('input[name="password"]').value)
        req_data.append('first_name', _elem('input[name="first_name"]').value)
        req_data.append('last_name', _elem('input[name="last_name"]').value)
        _post({url:`${HOST}/registration/`, data: req_data},function(response){
            response = JSON.parse(response)
            console.log(response)
        })
    })
}
//#endregion

//#region Auth User

function UserFiles(){
    let req_data = new FormData();
    req_data.append('token', TOKEN)
    _post({url:`${HOST}/disk/`, data: req_data}, function(response){
        response = JSON.parse(response);
        console.log(response)

        for (let index = 0; index < response.length; index++) {
            let row = document.createElement('tr');

            //#region cell
            let cell_fileID = document.createElement('td');
            cell_fileID.textContent = response[index].file_id;
            row.append(cell_fileID)
        

            
            let cell_name = document.createElement('td');
            
            cell_name.textContent = response[index].name;
            row.append(cell_name)
            


            let cell_download = document.createElement('td');
            let btn_download = document.createElement('button');
            btn_download.textContent='Скачать файл';
            btn_download.addEventListener('click', function(){
                window.location.assign(`${HOST}/${response[index].url}`)
            })
            cell_download.append(btn_download)
            row.append(cell_download)



            let cell_delete = document.createElement('td');
            let btn_delete = document.createElement('button');
            btn_delete.textContent='Удалить файл';
            btn_delete.addEventListener('click', function(){
                let req_data = new FormData();
                req_data.append('id_file', response[index].file_id);
                req_data.append('token', TOKEN);
                _post({url:`${HOST}/delete/`, data: req_data}, function(res){
                    res = JSON.parse(res);
                    console.log(res)
                    cell_fileID.textContent = '';
                    cell_download.textContent = '';
                    cell_delete.textContent = '';
                    cell_changFl.textContent = '';
                    cell_changeAc.textContent = '';
                    
                    cell_name.textContent = res.message;
                })
            })
            cell_delete.append(btn_delete)
            row.append(cell_delete)
            

            //ИЗМЕНИТЬ ФАЙЛ
            let cell_changFl = document.createElement('td');
            let btn_changeFl = document.createElement('button');
            btn_changeFl.textContent='Изменить имя файла';
            btn_changeFl.addEventListener('click', function(){
                // let inp = document.createElement('input')
                // cell_name.append(inp)
                let req_data = new FormData();
                req_data.append('name', 'new Name')
                req_data.append('id_file', response[index].file_id);
                req_data.append('token', TOKEN);
                _post({url:`${HOST}/edit/`, data: req_data}, function(res){
                    res = JSON.parse(res);
                    cell_name.textContent = res.message;
                })
            })
            cell_changFl.append(btn_changeFl)
            row.append(cell_changFl)

            //ИЗМЕНИТЬ ПРАВА ДОСТУПА
            let cell_changeAc = document.createElement('td');
            let btn_changeAc = document.createElement('button');
            btn_changeAc.textContent='Изменить права доступа';
            
            btn_changeAc.addEventListener('click', function(){
                _load('/modules/file.html', CONTEXT, function(){
                    let old_fileName = _elem('.old_fileName');
                    let file_id = _elem('.file_id');
                    old_fileName.textContent = response[index].name;
                })
            })
            cell_changeAc.append(btn_changeAc)
            row.append(cell_changeAc)
//#region comment
            // let btn_AddAc = document.createElement('button');
            // let btn_DelAc = document.createElement('button');


            // //Удалить права доступа
            // btn_DelAc.textContent='Удалить права доступа';
            // btn_DelAc.addEventListener('click', function(){
            //     let req_data = new FormData();
            //     Email = 'user@user.ru'
            //     req_data.append('email', Email);
            //     req_data.append('id_file', response[index].file_id);
            //     req_data.append('token', TOKEN);
            //     _post({url:`${HOST}/deleteaccesses/`, data: req_data}, function(res){
            //         res = JSON.parse(res);
            //         console.log(res);
            //     })
            // })
            // cell_changeAc.append(btn_DelAc)


            // //Добавить права доступа
            // btn_AddAc.textContent='Добавить права доступа';
            // btn_AddAc.addEventListener('click', function(){
            //     let req_data = new FormData();
            //     Email = 'user@user.ru'
            //     req_data.append('email', Email);
            //     req_data.append('id_file', response[index].file_id);
            //     req_data.append('token', TOKEN);
            //     _post({url:`${HOST}/accesses/`, data: req_data}, function(res){
            //         res = JSON.parse(res);
            //         console.log(res);
            //     })
            // })
            // cell_changeAc.append(btn_AddAc)
            
            // row.append(cell_changeAc)
            // //#endregion
//#endregion
            _elem('table tbody').append(row)
        }
    })
    _elem('.btn-upload-file').addEventListener('click', function(){
        _load('/modules/upload.html', CONTEXT, UploadFiles)
    })
}
function changeAc(fileName){
    
}

function UploadFiles(){
    _elem('.upload-files').addEventListener('click', function(){
        let array = [];
        for (let index = 0; index < _elem('input[name="files"]').files.length; index++) {
            let req_data = new FormData();
            req_data.append('token', TOKEN)
            req_data.append('files', _elem('input[name="files"]').files[index])
            
            _post({url:`${HOST}/upload`, data: req_data}, function(response){
                response = JSON.parse(response)
                array[index] = response[0];
                
                let row = document.createElement('tr');

                let cell_name = document.createElement('td');
                cell_name.textContent = array[index].name;
                row.append(cell_name)

                let cell_success = document.createElement('td');
                cell_success.textContent = array[index].success;
                row.append(cell_success)

                let cell_download = document.createElement('td');
                let btn_download = document.createElement('button');
                btn_download.textContent='Скачать файл';
                btn_download.addEventListener('click', function(){
                    window.location.assign(`${HOST}/${response[index].url}`)
                })
                cell_download.append(btn_download)
                row.append(cell_download)


                _elem('.table tbody').append(row)
        
            })   
        }
    })
    _elem('.btn-to-disk').addEventListener('click', function(){
        _load('/modules/profile.html', CONTEXT, UserFiles)
    })
    

}




//#endregion
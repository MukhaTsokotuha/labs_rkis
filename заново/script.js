//#region Const-Comb
const content = document.querySelector('body');
var TOKEN = '';
const host = 'http://web-app.api-web-tech.local';

function _ById(sel){
    return document.getElementById(sel)
}
function _elem(sel){
    return document.querySelector(sel)
}
function _create(sel){
    return document.createElement(sel)
}
function _event(sel,f){
    let btn = document.getElementById(sel)
    return btn.addEventListener('click',f)
}
function _eventLoad(sel,url,body){
    let btn = document.getElementById(sel)
    return btn.addEventListener('click', function(){_get(url,body)})
}

//#endregion


function _load(url, body, callback ){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send()
    xhr.onreadystatechange = function(){
        if (xhr.readyState==4){
            body.innerHTML = xhr.responseText;
            if (callback){
                callback(xhr.responseText)
            }
        }
    } 
}
function _get(url, callback){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url)
    xhr.send()

    xhr.onreadystatechange = function(){
        if (xhr.readyState==4){
            callback(xhr.responseText)
        }
    }
}

function _post(params, callback){
    let xhr = new XMLHttpRequest();
    xhr.open('POST', params.url);
    xhr.send(params.data)
    xhr.onreadystatechange = function(){
        if (xhr.readyState==4){
            callback(xhr.responseText)
        }
    } 
}



_load('/modules/auth.html', content, function(){
    _event('btn_vxod', function(){
        _elem('.message').textContent = '';
        let email = _ById('email').value;
        let password = _ById('password').value;
        let req_data = new FormData()
        req_data.append('email', email)
        req_data.append('password', password)
        _post({url: `${host}/authorization`, data: req_data}, function(res){
            res = JSON.parse(res)
            if (res.success){
                TOKEN = res.token;
                _load('/modules/userFiles.html', content, UserFiles)
            }else{
                _elem('.message').textContent = res.message;
            }
        })
    })
    _event('btn_reg', function(){
        _load('/modules/registration.html', content, doReg)
    })
})
function doReg(){
    _event('btn_reg', function(){
        let req_data_reg = new FormData();
        req_data_reg.append('first_name', _ById('name').value)
       
        req_data_reg.append('last_name',_ById('last_name').value)
        req_data_reg.append('email',_ById('email').value)
        req_data_reg.append('password',_ById('password').value)
        _post({url:`${host}/registration`, data: req_data_reg}, function(res_reg){
            res_reg = JSON.parse(res_reg)
            if (res_reg.success){
                _elem('.message').textContent = 'Вы успешно зарегистрированы!'
            }
        })
    })
}

function AccessingFiles(){
    _event('back', function(){
        _load('/modules/userFiles.html', content, UserFiles)
    })
    let req_data_shared = new FormData()
    req_data_shared.append('token', TOKEN)
    _post({url: `${host}/shared`, data: req_data_shared},  function(res_shared){
        res_shared = JSON.parse(res_shared)
        console.log(res_shared)
        
        for (let i = 0; i < res_shared.length; i++) {
            let row = _create('tr')

            let cell_file_id = _create('td')
            let file_id = res_shared[i].file_id
            cell_file_id.textContent = file_id;
            row.append(cell_file_id)

            let cell_file_name = _create('td')
            let file_name  = res_shared[i].name;
            cell_file_name.textContent = file_name;
            row.append(cell_file_name)

            let cell_download = _create('td')///////////////////////////////////////////////////////////////DOWNLOAD
            let btn_download = _create('button')
            btn_download.textContent = 'Скачать'
            let DOWNLOAD = res_shared[i].url;
            console.log(res_shared[i].url)
            btn_download.addEventListener('click', function(){
                window.location.assign(`${host}/${DOWNLOAD}`)
            })
            cell_download.append(btn_download)
            row.append(cell_download)

            _elem('table tbody').append(row)
        }
    })
}
function UserFiles(){
    _event('btn_download', function(){
        _load('/modules/upload.html', content, UploadFiles)
    })
    _event('btn_access_file', function(){
        _load('/modules/accessing_file.html', content, AccessingFiles)
    })

    _get(`${host}/disk/?token=${TOKEN}`,  function(res){
        res = JSON.parse(res)
        console.log(res)
        for (let i = 0; i < res.length; i++) {
            let row = _create('tr')

            let cell_file_id = _create('td')
            let file_id = res[i].file_id
            cell_file_id.textContent = file_id;
            row.append(cell_file_id)
            
            let cell_name = _create('td')
            let name = res[i].name
            cell_name.textContent = name;
            row.append(cell_name)

            let cell_download = _create('td')///////////////////////////////////////////////////////////////DOWNLOAD
            let btn_download = _create('button')
            btn_download.textContent = 'Скачать'
            btn_download.setAttribute('style', 'background-color:rgb(75, 182, 43); color: #fff; border: none; border-radius: 0.5dvh; padding: 2px; margin: 5px; font-weight: 600; text-transform: uppercase')

            let DOWNLOAD = res[i].url;
            console.log(res[i].url)
            btn_download.addEventListener('click', function(){
                window.location.assign(`${host}/${DOWNLOAD}`)
            }) 
            
            cell_download.append(btn_download)
            row.append(cell_download)

            let cell_delete = _create('td')//////////////////////////////////////////////////////////////////DELETE
            let btn_delete  = _create('button')
            btn_delete.textContent = 'Удалить';         
            btn_delete.addEventListener('click', function(){
                let req_data_del = new FormData();
                req_data_del.append('token', TOKEN)
                console.log(file_id)
                req_data_del.append('id_file', file_id)
                _post({url: `${host}/delete`, data: req_data_del}, function(res_del){
                    res_del= JSON.parse(res_del)
                    console.log(res_del)
                    cell_name.textContent = res_del.message;
                    cell_rename.textContent = '';
                    cell_access.textContent = '';
                    cell_download.textContent = '';
                    cell_delete.textContent = '';
                })
            })
            btn_delete.setAttribute('style', 'background-color:rgb(75, 182, 43); color: #fff; border: none; border-radius: 0.5dvh; padding: 2px; margin: 5px;font-weight: 600; text-transform: uppercase')
            cell_delete.append(btn_delete)
            row.append(cell_delete)


            let cell_rename = _create('td')////////////////////////////////////////////////////////////////RENAME
            let btn_rename = _create('button')
            btn_rename.textContent = '=>'
            btn_rename.addEventListener('click', function(){
                _load('/modules/rename_file.html', content, function(){
                    _event('btn_rename_file', function(){
                        req_data_rename = new FormData();
                        req_data_rename.append('name', _ById('new_file_name').value)
                        req_data_rename.append('id_file', file_id)
                        req_data_rename.append('token', TOKEN)
                        _post({url:`${host}/edit`, data: req_data_rename}, function(response){
                            console.log(response)
                        })
                    })
                    _event('back', function(){
                        _load('/modules/userFiles.html', content, UserFiles)
                    })
                })
            })
            btn_rename.setAttribute('style', 'background-color:rgb(75, 182, 43); color: #fff; border: none; border-radius: 0.5dvh; padding: 2px; margin: 5px')
            cell_rename.append(btn_rename)
            row.append(cell_rename)

            //#region Accesses
            let cell_access = _create('td')
            let btn_access = _create('button')
            btn_access.addEventListener('click', function(){
                _load('/modules/doAccess.html', content, function(){
                    _elem('.id_file_access').textContent = file_id;
                    _elem('.name_file_access').textContent = name;
                    
                    _event('btn_add_access', function(){
                        let email = _elem('input').value;
                        let req_data = new FormData()
                        req_data.append('token', TOKEN);
                        req_data.append('email', email)
                        req_data.append('id_file', file_id)
                        _post({url: `${host}/accesses`, data: req_data}, function(res){
                            res = JSON.parse(res)
                            console.log(res)
                            
                            for (let index = 0; index < res.length; index++) {
                                _elem('.files_access').append(res[index].email + ', '); 
                                console.log(res[index].email)
                            }
                            
                        })
                    })
                    _event('btn_del_access', function(){
                        let email = _elem('input').value;
                        let req_data = new FormData()
                        req_data.append('token', TOKEN);
                        req_data.append('email', email)
                        req_data.append('id_file', file_id)
                        _post({url: `${host}/deleteaccesses`, data: req_data}, function(res){
                            res = JSON.parse(res)
                            console.log(res)
                            
                            for (let index = 0; index < res.length; index++) {
                                _elem('.files_access').append(res[index].email + ', '); 
                                console.log(res[index].email)
                            }
                            
                        })
                    })
                    _event('back', function(){
                        _load('/modules/userFiles.html', content, UserFiles)
                    })

                    
                })
            })
            btn_access.setAttribute('style', 'background-color:rgb(75, 182, 43); color: #fff; border: none; border-radius: 0.5dvh; padding: 2px; margin: 5px')
            btn_access.textContent = '=>'
            cell_access.append(btn_access)
            row.append(cell_access)
            //#endregion
            
            _elem('table tbody').append(row)
            }
    })
}

function UploadFiles(){
    _event('back', function(){
        _load('/modules/userFiles.html', content, UserFiles)
    })
    _event('btn_download', function(){
        let arrayFiles = _ById('upload_files').files;//Список файлов
        for (let i = 0; i < arrayFiles.length; i++) {
            file = arrayFiles[i];//Данные файла
            let req_data_upload = new FormData();
            req_data_upload.append('token', TOKEN)
            req_data_upload.append('files', file)
            _post({url: `${host}/upload`, data: req_data_upload},  function(res){
                
                res = JSON.parse(res)
                
                let row = _create('tr')

                let cell_file_id = _create('td')
                cell_file_id.textContent = res[0].file_id;
                row.append(cell_file_id)
                
                let cell_name = _create('td')
                cell_name.textContent = res[0].name;
                row.append(cell_name)

                let cell_download = _create('td')
                let btn_download = _create('button')
                btn_download.textContent = '=>'
                cell_download.append(btn_download)
                row.append(cell_download)

                let cell_rename = _create('td')
                let btn_rename = _create('button')
                btn_rename.textContent = '=>'
                cell_rename.append(btn_rename)
                row.append(cell_rename)

                let cell_access = _create('td')
                let btn_access = _create('button')
                btn_access.textContent = '=>'
                cell_access.append(btn_access)
                row.append(cell_access)

                _elem('table tbody').append(row)
            })
        } 
    })  
}
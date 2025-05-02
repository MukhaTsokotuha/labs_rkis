function _elem(sel){
    return document.querySelector(sel)
}
function _event(sel, callback){
    return document.querySelector(sel).addEventListener('click', callback)
}
function _load(url, content, callback){
    let xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.send()

    xhr.onreadystatechange = function(){
        if (xhr.readyState==4){
            content.innerHTML = xhr.responseText
            callback(xhr.responseText)
        }
    }
} 
function _get(url,callback){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url)
    xhr.send;

    xhr.onreadystatechange = function(){
        if (xhr.readyState == 4){
            callback(xhr.responseText)
        }
    }
}
function _post(url,data, callback){
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url)
    xhr.send(data)

    xhr.onreadystatechange = function(){
        if (xhr.readyState==4){
            callback(xhr.responseText)
        }
    }
}
_event('.menu_btn', function(){
    _get(`${HOST}/logout`, function(res){
        console.log(res)
    })
    _load('/html/page_auth.html', cont, _doAuth)
})
const HOST = 'http://web-app.api-web-tech.local';
//const HOST = 'http://apiweb.akulov.pw';
let TOKEN = ``;

let active_block1 = _elem('.block_menu--1')
let active_block2 = _elem('.block_menu--2')
let active_block3 = _elem('.block_menu--3')

function _doActive(active_block1, active_block2,active_block3){
    active_block1.setAttribute('style','background-color: #ffffff6e;')
    active_block2.setAttribute('style', 'background-color: #1B1E24;')
    active_block3.setAttribute('style', 'background-color: #1B1E24;')
}
      
_event('.block_menu--1', function(){
    
    _load('/html/my_files.html',cont, _doMyFiles)
})
_event('.block_menu--2', function(){
   
    _load('/html/ac_files.html',cont, _doAcFiles)
})
_event('.block_menu--3', function(){

    _load('/html/download_file.html',cont, _downloadFiles)
})

let cont = document.querySelector('.content')



_load('/html/page_auth.html', cont, _doAuth)

function _doAuth(){
    _elem('.top_line').setAttribute('style', 'display:none')
    _elem('.left_menu').setAttribute('style', 'display:none')
    _event('.btn_auth', function(){
        let inp_email = document.getElementById('email').value; 
        let inp_password = document.getElementById('password').value; 
        let req_data_1 = new FormData();
        req_data_1.append('email', inp_email)
        req_data_1.append('password', inp_password)

        _post(`${HOST}/authorization`, req_data_1, function(res){
            res = JSON.parse(res)
            if (res.success){
                TOKEN = res.token;
                console.log(TOKEN)
                console.log(res)
                _load(`/html/my_files.html`, cont, _doMyFiles)
            }else{
                _elem('.message--block').textContent = 'Пользователя с таким логином не существует'
            }
            
        } )
        
        

    })
    _event('.btn_reg', function(){
        _load(`/html/reg.html`, cont, _doReg)
    })
    
}
function _doReg(){
    _elem('.btn_reg').addEventListener('click', function(){
        let req_data = new FormData();
        req_data.append('email', _elem('.email').value)
        req_data.append('password', _elem('.password').value)
        req_data.append('first_name', _elem('.first_name').value)
        req_data.append('last_name', _elem('.last_name').value)
        _post(`${HOST}/registration/`, req_data,function(response){
            response = JSON.parse(response)
            //console.log(response)
            if (response.message == "Success"){
                _elem('.message--block').textContent = ''

                TOKEN = response.token;
               // console.log(TOKEN)
                _load('/html/my_files.html', cont, _doMyFiles)
            }else{
                _elem('.message--block').textContent = response["message"].email
                
            }
        })
    })
    _event('.a_auth', function(){
        _load('/html/page_auth.html', cont, _doAuth)
    })
}
function _doMyFiles(){ 
    _doActive(active_block1,active_block2,active_block3)
    _elem('.top_line').setAttribute('style', 'display:flex')
    _elem('.left_menu').setAttribute('style', 'display:block')

    let req_data_2 = new FormData();
    req_data_2.append('token', TOKEN)
    _post(`${HOST}/disk`, req_data_2,function(res){
        res = JSON.parse(res)
        for (let i = 0; i < res.length; i++) {
          
            if ( res[i].file_id=='449'){
                console.log(res[i])
                console.log(res[i]["access"][0]["email"])
            }
           
            let row = document.createElement('tr')

            let cell_file_id = document.createElement('td')
            cell_file_id.textContent = res[i].file_id;
            row.append(cell_file_id)

            let cell_name = document.createElement('td')
            cell_name.textContent = res[i].name;                 
            row.append(cell_name)

            let cell_download = document.createElement('td')
            let btn_download = document.createElement('button')
            btn_download.textContent = '->'
            var DOWNLOAD = res[i].url;
            btn_download.addEventListener('click', function(){
                window.location.assign(`${HOST}/${DOWNLOAD}`)
            })
            cell_download.append(btn_download)               
            row.append(cell_download)

            let cell_delete = document.createElement('td');
            let btn_delete = document.createElement('button');
            btn_delete.textContent='->';
            btn_delete.addEventListener('click', function(){
                let req_data = new FormData();
                req_data.append('id_file', res[i].file_id);
                req_data.append('token', TOKEN);
                _post(`${HOST}/delete/`, req_data, function(response){
                    response = JSON.parse(response);
                    //console.log(response)
                    cell_file_id.textContent = '';
                    cell_download.textContent = '';
                    cell_delete.textContent = '';
                    cell_change.textContent = '';
                    cell_name.textContent = '';
                    
                    cell_name.textContent = response.message;
                })
            })
            cell_delete.append(btn_delete)
            row.append(cell_delete)

            let cell_change = document.createElement('td')
            let btn_change = document.createElement('button')
            btn_change.textContent = '->'
            btn_change.addEventListener('click', function(){
                _load('/html/change_name.html', cont, function(){
                    _event('.i_back', function(){
                        _load('/html/my_files.html', cont, _doMyFiles)
                    })
                    _elem('.old_fileName').textContent = res[i].name;
                    _elem('.file_id').textContent = res[i].file_id;
                    _event('.btn_change', function(){
                        let inp = _elem('input[name="new_fileName"]').value;
                        let req_data = new FormData();
                        req_data.append('name', inp);
                        req_data.append('id_file', res[i].file_id);
                        req_data.append('token', TOKEN);
                        console.log(req_data)
                        _post(`${HOST}/edit/`, req_data, function(response){
                            response = JSON.parse(response);
                            //console.log(response)
                            if (response.success){
                                _elem('.message--block').textContent = 'Успешно переименовано';
                            }else{
                                _elem('.message--block').textContent = 'Ошибка';
                            }
                        })
                    })
                })
            })
            cell_change.append(btn_change)                  
            row.append(cell_change)

            let cell_access = document.createElement('td')
            let btn_access = document.createElement('button')
            btn_access.textContent = '->'
            btn_access.addEventListener('click', function(){
                let ar_access = res[i]["access"];
                _load('/html/accesses.html', cont, function(){
                   
                    _event('.i_back', function(){
                        _load('/html/my_files.html', cont, _doMyFiles)
                    })
                    _elem('.file_name').textContent = res[i].name
                    _elem('.file_id').textContent = res[i].file_id
                    for (let index = 0; index < ar_access.length; index++) {
                        let ac_row = document.createElement('tr')

                        let ac_cell_num = document.createElement('td')
                        ac_cell_num.textContent = index+1
                        ac_row.append(ac_cell_num)

                        let ac_cell_email = document.createElement('td')
                        ac_cell_email.textContent = ar_access[index]["email"]
                        ac_row.append(ac_cell_email)

                        _elem('table tbody').append(ac_row)
                        
                    }
                    _elem('.btn--addAc').addEventListener('click', function(){
                      
                        let email_access = _elem('input[name="email_access"').value;

                        _elem('table').textContent = ''
                        let thed = document.createElement('thead')
                        let th1 = document.createElement('th')
                        th1.textContent = '№'
                        let th2 = document.createElement('th')
                        th2.textContent = 'Email'
                        thed.append(th1)
                        thed.append(th2)
                        _elem('table').append(thed)

                        let req_data = new FormData();
                        req_data.append('id_file', res[i].file_id);
                        req_data.append('email', email_access);
                        req_data.append('token', TOKEN);
                        _post(`${HOST}/accesses/`, req_data, function(response){
                            //console.log(response.status)
                            response = JSON.parse(response);
                            //console.log(response);
                            if (response.message == "Not found"){
                                _elem('.message--block').textContent = 'Такого пользователя не существует'
                            }else{
                                _elem('.message--block').textContent = 'Права доступа успешно обновлены'
                                for (let index = 0; index < response.length; index++) {
                                    
                                    let ac_row = document.createElement('tr')

                                    let ac_cell_num = document.createElement('td')
                                    ac_cell_num.textContent = index+1
                                    ac_row.append(ac_cell_num)
            
                                    let ac_cell_email = document.createElement('td')
                                    ac_cell_email.textContent = response[index]["email"]
                                    console.log(response[index]["email"])
                                    
                                    ac_row.append(ac_cell_email)
                                    tab = document.createElement('tbody')
                                    tab.append(ac_row)
                                    _elem('table').append(tab)
                                    
                                }
                            }
                            //_elem('.rule_table').textContent = response[0].email;
                        })
                    })
                    _elem('.btn--delAc').addEventListener('click', function(){
                        let req_data = new FormData();
                        let email_delAc = _elem('input[name="email_access"').value;
                        //let id_file = _elem('input[name="id_access"]').value;
                        req_data.append('email', email_delAc);
                        req_data.append('id_file', res[i].file_id);
                        req_data.append('token', TOKEN);
                        _post(`${HOST}/deleteaccesses/`,req_data, function(response1){
                            response1 = JSON.parse(response1);
                            console.log(response1);
                            if (response1.message == "Not found"){
                                _elem('.message--block').textContent = 'Такого пользователя не существует'
                            }else if (response1.message=="Forbidden for you"){
                                _elem('.message--block').textContent = 'Вы не можете удалить себя из списка прав доступа к этому файлу'
                            }else{
                                _elem('table').textContent = ''
                                let thed = document.createElement('thead')
                                let th1 = document.createElement('th')
                                th1.textContent = '№'
                                let th2 = document.createElement('th')
                                th2.textContent = 'Email'
                                thed.append(th1)
                                thed.append(th2)
                                _elem('table').append(thed)
                                _elem('.message--block').textContent = 'Права доступа успешно обновлены'
                                for (let index = 0; index < response1.length; index++) {
                                    
                                    let ac_row = document.createElement('tr')

                                    let ac_cell_num = document.createElement('td')
                                    ac_cell_num.textContent = index+1
                                    ac_row.append(ac_cell_num)
            
                                    let ac_cell_email = document.createElement('td')
                                    ac_cell_email.textContent = response1[index]["email"]
                                    console.log(response1[index]["email"])
                                    
                                    ac_row.append(ac_cell_email)
                                    tab = document.createElement('tbody')
                                    tab.append(ac_row)
                                    _elem('table').append(tab)
                                    
                                    
                                    
                                }
                            }
                            // if (response[0]){
                            //     _elem('.rule_table').textContent = response[0].email;
                            // }else{
                            //     _elem('.rule_table').textContent = 'empty';
                            // }
                            
                        })
                    })
                })
            })
            cell_access.append(btn_access)                  
            row.append(cell_access)

            document.querySelector('table tbody').append(row)

        }
    })
}

function _doAcFiles(){
    _doActive(active_block2,active_block1,active_block3)
    //console.log(TOKEN)
    let req_data_3 = new FormData();
    req_data_3.append('token', TOKEN)
    _post(`${HOST}/shared`, req_data_3,function(res){
        res = JSON.parse(res)
       // console.log(res)
        for (let i = 0; i < res.length; i++) {
            //console.log(res[i])
            let row = document.createElement('tr')

            let cell_file_id = document.createElement('td')
            cell_file_id.textContent = res[i].file_id;
            row.append(cell_file_id)

            let cell_name = document.createElement('td')
            cell_name.textContent = res[i].name;                 
            row.append(cell_name)

            let cell_download = document.createElement('td')
            let btn_download = document.createElement('button')
            btn_download.textContent = '->'
            var DOWNLOAD = res[i].url;
            btn_download.addEventListener('click', function(){
                window.location.assign(`${HOST}/${DOWNLOAD}`)
            })
            cell_download.append(btn_download)               
            row.append(cell_download)

            document.querySelector('table tbody').append(row)

        }
        //let file_id = res.file_id
    })
}
function _downloadFiles(){
    _doActive(active_block3,active_block2,active_block1)
    let btn_files = document.getElementById('files');
    btn_files.addEventListener('change', function(){
        ar_files = btn_files.files
        //console.log(btn_files.files)
        for (let i = 0; i < ar_files.length; i++) {
            //console.log(ar_files[i].name);
            let row = document.createElement('tr')

            let cell_num = document.createElement('td')
            cell_num.textContent = i+1;
            row.append(cell_num)

            let cell_name = document.createElement('td')
            cell_name.textContent = ar_files[i].name;
            row.append(cell_name)

            document.querySelector('.table_download').append(row)
        }  
        _event('.btn_download', function(){
            for (let i = 0; i < ar_files.length; i++) {
                //console.log(ar_files[i]);
                let req_data_4 = new FormData()
                req_data_4.append('files', ar_files[i])
                req_data_4.append('token', TOKEN)
                _post(`${HOST}/upload`, req_data_4, function(res){
                   // console.log(res)
                    res = JSON.parse(res)
                    ar = res[0]
                    let row = document.createElement('tr')

                    let cell_file_id = document.createElement('td')
                    cell_file_id.textContent = ar.file_id;
                    
                    row.append(cell_file_id)

                    let cell_name = document.createElement('td')
                    cell_name.textContent = ar.name;
                    row.append(cell_name)

                    let cell_download = document.createElement('td')
                    let btn_download = document.createElement('button')
                    btn_download.textContent = '->'
                    var DOWNLOAD = ar.url;

                    btn_download.addEventListener('click', function(){
                        window.location.assign(`${HOST}/${DOWNLOAD}`)
                    })
                    
                    cell_download.append(btn_download)               
                    row.append(cell_download)

                    document.querySelector('.table').append(row)
                })
            }   
        })             
    })
    //console.log(files)
    _event('.btn_download', function(){
        let row = document.createElement('tr')

        let cell_name = document.createElement('td')
        cell_name.textContent = files[0].name;
        row.append(cell_name)

        document.querySelector('table tbody').append(row)
    })

}

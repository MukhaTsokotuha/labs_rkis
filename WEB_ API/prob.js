
 //#region cell
           
            // let cell_fileID = _create('td');
            // cell_fileID.textContent = response[index].file_id;
            // row.append(cell_fileID)
            
            // let cell_name = _create('td');
            // cell_name.textContent = response[index].name;
            // row.append(cell_name)
            


            // let cell_download = _create('td');
            // let btn_download = _create('button');
            // btn_download.textContent='Скачать файл';
            // btn_download.addEventListener('click', function(){
            //     window.location.assign(`${HOST}/${response[index].url}`)
            // })
            // cell_download.append(btn_download)
            // row.append(cell_download)



            // let cell_delete = _create('td');
            // let btn_delete = _create('button');
            // btn_delete.textContent='Удалить файл';
            // btn_delete.addEventListener('click', function(){
            //     let req_data = new FormData();
            //     req_data.append('id_file', response[index].file_id);
            //     req_data.append('token', TOKEN);
            //     _post({url:`${HOST}/delete/`, data: req_data}, function(res){
            //         res = JSON.parse(res);
            //         console.log(res)
            //         cell_fileID.textContent = '';
            //         cell_download.textContent = '';
            //         cell_delete.textContent = '';
            //         cell_changFl.textContent = '';
            //         cell_changeAc.textContent = '';
                    
            //         cell_name.textContent = res.message;
            //     })
            // })
            // cell_delete.append(btn_delete)
            // row.append(cell_delete)
            

            // //ИЗМЕНИТЬ ФАЙЛ
            // let cell_changFl = _create('td');
            // let btn_changeFl = _create('button');
            // btn_changeFl.textContent='Изменить имя файла';
            // btn_changeFl.addEventListener('click', function(){
            //     // let inp = document.createElement('input')
            //     // cell_name.append(inp)
            //     let req_data = new FormData();
            //     req_data.append('name', 'new Name')
            //     req_data.append('id_file', response[index].file_id);
            //     req_data.append('token', TOKEN);
            //     _post({url:`${HOST}/edit/`, data: req_data}, function(res){
            //         res = JSON.parse(res);
            //         cell_name.textContent = res.message;
            //     })
            // })
            // cell_changFl.append(btn_changeFl)
            // row.append(cell_changFl)

            // //ИЗМЕНИТЬ ПРАВА ДОСТУПА
            // let cell_changeAc = _create('td');
            // let btn_changeAc = _create('button');
            // btn_changeAc.textContent='Изменить права доступа';
            
            // btn_changeAc.addEventListener('click', function(){
            //     _load('/modules/file.html', CONTEXT, function(){
            //         let old_fileName = _elem('.old_fileName');
            //         let file_id = _elem('.file_id');
            //         old_fileName.textContent = response[index].name;
            //     })
            // })
            // cell_changeAc.append(btn_changeAc)
            // row.append(cell_changeAc)
        //#endregion
        //#region comment
            // let btn_AddAc = _create('button');
            // let btn_DelAc = _create('button');
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
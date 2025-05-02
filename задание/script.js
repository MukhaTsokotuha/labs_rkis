const url = 'http://study.akulov.pw/oblig-data.php';
let content = document.querySelector('.table')
let xhr = new XMLHttpRequest();
xhr.open('GET', url)
xhr.send()

xhr.onreadystatechange = function(){
    if (xhr.readyState==4){
        res = xhr.response;
        res = JSON.parse(res)
        res1 = res["Data"]["TableHeaders"]
        console.log(res["Data"]["TableHeaders"])
        for (let index = 0; index < res1.length; index++) {
            console.log(res1[index].name_field)
            let cell = document.createElement('th');
            cell.textContent = res1[index].name_field;
            document.querySelector('table thead').append(cell)
        }
        res2 = res["Data"]["TableData"]
        console.log(res["Data"]["TableData"])

        for (let index = 0; index < 12; index++) {
            
            let row = document.createElement('tr')

            let cell_SECID = document.createElement('td');
            cell_SECID.textContent = res2[index].SECID;
            row.append(cell_SECID)

            let cell_SECNAME = document.createElement('td');
            cell_SECNAME.textContent = res2[index].SECNAME;
            row.append(cell_SECNAME)

            let cell_LCURRENTPRICE = document.createElement('td');
            cell_LCURRENTPRICE.textContent = res2[index].LCURRENTPRICE;
            row.append(cell_LCURRENTPRICE)

            let cell_MATDATE = document.createElement('td');
            cell_MATDATE.textContent = res2[index].MATDATE;
            row.append(cell_MATDATE)

            let cell_LOTVALUE = document.createElement('td');
            cell_LOTVALUE.textContent = res2[index].LOTVALUE;
            row.append(cell_LOTVALUE)

            let cell_COUPONPERCENT = document.createElement('td');
            cell_COUPONPERCENT.textContent = res2[index].COUPONPERCENT;
            row.append(cell_COUPONPERCENT)
            
            let cell_COUPONVALUE = document.createElement('td');
            cell_COUPONVALUE.textContent = res2[index].COUPONVALUE;
            row.append(cell_COUPONVALUE)

            let cell_YEAR_COUPONVALUE = document.createElement('td');
            cell_YEAR_COUPONVALUE.textContent = res2[index].YEAR_COUPONVALUE;
            row.append(cell_YEAR_COUPONVALUE)

            let cell_YEAR_DOHODNOST = document.createElement('td');
            cell_YEAR_DOHODNOST.textContent = res2[index].YEAR_DOHODNOST;
            row.append(cell_YEAR_DOHODNOST)

            let cell_NEXTCOUPON = document.createElement('td');
            cell_NEXTCOUPON.textContent = res2[index].NEXTCOUPON;
            row.append(cell_NEXTCOUPON)

            let cell_YEAR_COUNT_COUPONS = document.createElement('td');
            cell_YEAR_COUNT_COUPONS.textContent = res2[index].YEAR_COUNT_COUPONS;
            row.append(cell_YEAR_COUNT_COUPONS)
            
            let cell_PRICE__CHANGE_DAY = document.createElement('td');
            cell_PRICE__CHANGE_DAY.textContent = res2[index].PRICE__CHANGE_DAY;
            row.append(cell_PRICE__CHANGE_DAY)

            document.querySelector('table thead').append(row)
        }
    }
}

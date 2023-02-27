// Bài 10 Tạo ID ngẫu nhiêu vs ngày tháng giờ
function generatedId(){
    return Math.random().toString(6).substr(2, 5);
}
console.log("So ngau nhiên ", generatedId())

function generateDate(){
    var d= new Date;
    const date = d.getDate();
    const month = d.getMonth();
    const year = d.getFullYear();
    const dd = date + "/"+month + "/"+year
 return dd ;
}
console.log("Ngày thang ngẫu nhiên", generateDate())

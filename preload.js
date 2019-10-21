// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  } 
  
  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})

//var window = {};
/*
node-gyp configure --module_name=node_sqlite3 --module_path=../lib/binding/electron-v1.6.6-win32-ia32
node-gyp rebuild -target=1.6.6 -arch=win32 -target_platform=win32 -dist-url=https://atom.io/download/electron/ -module_name=node_sqlite3 -module_path=../lib/binding/electron-v1.6.6-win32-ia32
使用前要先编译
*/
//空字符 = wq648a52vke1

const sqlite3 = require("sqlite3");
/*
  初始化检查数据库，若不存在则创建
*/








/***********************PersonInformation***************************/
let db = new sqlite3.Database('data/persons/data.db');
let householdab = ['name','sex','birthday','race'
                  ,'political','education','job'
                  ,'ownerid','phone','fc','familynum'
                  ,'photo','income','fielding'
                  ,'breeding','causeofpoverty'
                  ,'remark','groupnum'
                ];
let viligerab=['name','sex','birthday','id','relation','job','ownerid'];
let groupab = ['groupnum','groupname'];

let householdcreate = '';
let householdtab = '';
for(i=0;i<householdab.length;i++){
  householdcreate+=householdab[i];
  householdtab+=householdab[i];
  householdcreate+=' TEXT NOT NULL';
  if(i!=householdab.length-1){
    householdcreate+=',';
    householdtab+=',';
  }
}
let viligercreate = '';
let viligertab = '';
for(i=0;i<viligerab.length;i++){
  viligercreate+=viligerab[i];
  viligertab+=viligertab[i];
  viligercreate+=' TEXT NOT NULL';
  if(i!=viligerab.length-1){
    viligercreate+=',';
    viligertab+=',';
  }
}
let groupcreate = '';
let grouptab = '';
for(i=0;i<groupab.length;i++){
  groupcreate+=groupab[i];
  grouptab+=groupab[i];
  groupcreate+=' TEXT NOT NULL';
  if(i!=groupab.length-1){
    groupcreate+=',';
    grouptab+=',';
  }
}


try{
  //console.log(householdcreate);
  db.run('CREATE TABLE IF NOT EXISTS Households('+householdcreate+')');
  db.run('CREATE TABLE IF NOT EXISTS Viligers('+viligercreate+')');
  db.run('CREATE TABLE IF NOT EXISTS Groups('+groupcreate+')');
}catch(err){
  console.log(err);
};

//空字符 = wq648a52vke1
/*
  函数：添加户信息
  引入：Household
*/
window.ADD_Household_sql = (Household)=>{
  try{
    let tostr_Household = '';
    isfront = true;
    for(a in householdab){
      if(!isfront){
        tostr_Household+=',';
      }
      isfront = false;
      tostr_Household+='\'';
      if(Household[householdab[a]]!=undefined && Household[householdab[a]]!="")
        tostr_Household+=Household[householdab[a]];
      else
        tostr_Household+='wq648a52vke1';
      tostr_Household+='\'';
      //console.log(Household.name,Household['name'],Household[a],a);
    }
    //console.log(householdtabi,tostr_Household);
    let insert = 'INSERT INTO Households ('+householdtab+')';
    let value = 'VALUES('+tostr_Household+')';
    console.log(Household,insert,value);
    db.run(insert+' '+value);
  }catch(err){
    console.log(err);
  }
}

/*
  函数：添加人信息
  引入：Viliger
*/
window.ADD_Viliger_sql = (Viliger)=>{
  try{
    let tostr_Viliger = '';
    isfront = true;
    for(a in viligerab){
      if(!isfront){
        tostr_Viliger+=',';
      }
      isfront = false;
      tostr_Viliger+='\'';
      if(Viliger[viligerab[a]]!=undefined && Viliger[viligerab[a]]!="")
        tostr_Viliger+=Viliger[viligerab[a]];
      else
        tostr_Viliger+='wq648a52vke1';
      tostr_Viliger+='\'';
      //console.log(Viliger.name,Viliger['name'],Viliger[a],a);
    }
    //console.log(viligertabi,tostr_Viliger);
    let insert = 'INSERT INTO Viligers ('+viligerab+')';
    let value = 'VALUES('+tostr_Viliger+')';
    console.log(Viliger,insert,value);
    db.run(insert+' '+value);
  }catch(err){
    console.log(err);
  }
}

/*
  函数：添加组信息
  引入：Group
*/
window.ADD_Group_sql = (Group)=>{
  try{
    let tostr_Group = '';
    isfront = true;
    for(a in groupab){
      if(!isfront){
        tostr_Group+=',';
      }
      isfront = false;
      tostr_Group+='\'';
      if(Group[groupab[a]]!=undefined && Group[groupab[a]]!="")
        tostr_Group+=Group[groupab[a]];
      else
        tostr_Group+='wq648a52vke1';
      tostr_Group+='\'';
      //console.log(Group.name,Group['name'],Group[a],a);
    }
    //console.log(grouptabi,tostr_Group);
    let insert = 'INSERT INTO Groups ('+groupab+')';
    let value = 'VALUES('+tostr_Group+')';
    console.log(Group,insert,value);
    db.run(insert+' '+value);
  }catch(err){
    console.log(err);
  }
}

/*
  函数：导出所有组
  全部组信息组成的列表
*/
window.GETALL_Group = (callback)=>{
  try{
    db.all('SELECT * FROM Groups ORDER BY groupnum',[],(err,group_rows)=>{
      if(err){
        console.log(err);
      }
      callback(group_rows);
    });
  }catch(err){
    console.log(err);
  }
}

/*
  函数：导出指定组的户
  引入：组号
  一次为组号是目标组号的单个户，循环直到全部
*/
window.GET_Household_hasgroupnum = (Group,callback)=>{
  try{
    db.each('SELECT * FROM Households WHERE groupnum = ? ORDER BY name',[Group.groupnum+''],(err,household_row)=>{
      if(err){
        throw(err);
      }
      callback(household_row);
    });
  }catch(err){
    console.log(err);
  }
}
/*
  函数：导出指定指定户的村民
  引入：户主身份证
  一次为指定单个村民，循环直到全部
*/
window.GET_Viliger_hasownerid = (Household,callback)=>{
  try{
    db.each('SELECT * FROM Viligers WHERE ownerid = ? ORDER BY NAME',[Household.ownerid],(err,viliger_row)=>{
      if(err){
        throw(err);
      }
      callback(viliger_row);
    });
  }catch(err){
    console.log(err);
  }
}

window.DEL_Group = (groupnum)=>{
  try{
    db.run('DELETE FROM Groups WHERE groupnum = ?',groupnum,(err)=>{
      if(err){
        throw(err);
      }
      console.log('删除组',groupnum);
    });
  }catch(err){
    console.log(err);
  }
}

window.DEL_Viliger = (id)=>{
  try{
    db.run('DELETE FROM Viligers WHERE id = ?',id,(err)=>{
      if(err){
        throw(err);
      }
    });
  }catch(err){
    console.log(err);
  }
}

window.DEL_Viliger_hasownerid = (ownerid)=>{
  try{
    db.run('DELETE FROM Viligers WHERE ownerid = ?',ownerid,(err)=>{
      if(err){
        throw(err);
      }
    });
  }catch(err){
    console.log(err);
  }
}

window.DEL_Household = (ownerid)=>{
  try{
    db.run('DELETE FROM Households WHERE ownerid = ?',ownerid,(err)=>{
      if(err){
        throw(err);
      }
    });
  }catch(err){
    console.log(err);
  }
}

window.Update_Viliger_ownerid = (oldownerid,newownerid)=>{
  db.run('UPDATE Viligers SET ownerid = ? WHERE ownerid = ?',[newownerid,oldownerid],(err)=>{
    if(err)
      console.log(err);
  })
}



/****************************ConstructionInformation************************************/
let db_ConstructionInformation = new sqlite3.Database('data/constructions/data.db');
let constructionab = [
  'uid',  //识别码
  'name', //项目名称
  'ownername',  //负责人姓名
  'ownerphone',  //负责人电话
  'unit',        //申请单位
  'unitphone',   //单位电话
  'begindate',   //开始日期
  'message',
  'remark'       //备注
]; 
let constructioncreate = '';
let constructiontab = '';
for(i=0;i<constructionab.length;i++){
  constructioncreate+=constructionab[i];
  constructiontab+=constructionab[i];
  constructioncreate+=' TEXT NOT NULL';
  if(i!=constructionab.length-1){
    constructioncreate+=',';
    constructiontab+=',';
  }
}

db_ConstructionInformation.run('CREATE TABLE IF NOT EXISTS Constructions('+constructioncreate+')');

/*
  函数：添加项目信息
  引入：Construction
*/
window.ADD_Construction_sql = (Construction)=>{
  try{
    let tostr_Construction = '';
    isfront = true;
    for(a in constructionab){
      if(!isfront){
        tostr_Construction+=',';
      }
      isfront = false;
      tostr_Construction+='\'';
      if(Construction[constructionab[a]]!=undefined && Construction[constructionab[a]]!="")
        tostr_Construction+=Construction[constructionab[a]];
      else
        tostr_Construction+='wq648a52vke1';
      tostr_Construction+='\'';
      //console.log(Household.name,Household['name'],Household[a],a);
    }
    //console.log(householdtabi,tostr_Household);
    let insert = 'INSERT INTO Constructions ('+constructiontab+')';
    let value = 'VALUES('+tostr_Construction+')';
    console.log(Construction,insert,value);
    db_ConstructionInformation.run(insert+' '+value);
  }catch(err){
    console.log(err);
  }
}

window.GETALL_Construction = (callback)=>{
  db_ConstructionInformation.all('SELECT * FROM Constructions ORDER BY uid',[],(err,construction_rows)=>{
    if(err){
      console.log(err);
    }
    callback(construction_rows);
  });
}

window.DEL_Construction = (uid)=>{
  db_ConstructionInformation.run('DELETE FROM Constructions WHERE uid = ?',uid,(err)=>{
    if(err){
      console.log(err);
    }
  });
}

window.Update_Construction_message = (uid,message)=>{
  if(message=='') message='wq648a52vke1';
  //console.log(message);
  db_ConstructionInformation.run('UPDATE Constructions SET message = ? WHERE uid = ?',[message,uid],(err)=>{
    if(err){
      console.log(err);
    }
  });
}






/****************************EquipmentsInformation************************************/
let db_EquipmentInformation = new sqlite3.Database('data/equipments/data.db');
let equipmentab = [
  'uid',  //识别码
  'name', //设备名称
  'ownername',  //负责人姓名
  'ownerphone',  //负责人电话
  'begindate',   //登记日期
  'message',     
  'remark'       //备注
]; 
let equipmentcreate = '';
let equipmenttab = '';
for(i=0;i<equipmentab.length;i++){
  equipmentcreate+=equipmentab[i];
  equipmenttab+=equipmentab[i];
  equipmentcreate+=' TEXT NOT NULL';
  if(i!=equipmentab.length-1){
    equipmentcreate+=',';
    equipmenttab+=',';
  }
}

db_EquipmentInformation.run('CREATE TABLE IF NOT EXISTS Equipments('+equipmentcreate+')');

/*
  函数：添加项目信息
  引入：Equipment
*/
window.ADD_Equipment_sql = (Equipment)=>{
  try{
    let tostr_Equipment = '';
    isfront = true;
    for(a in equipmentab){
      if(!isfront){
        tostr_Equipment+=',';
      }
      isfront = false;
      tostr_Equipment+='\'';
      if(Equipment[equipmentab[a]]!=undefined && Equipment[equipmentab[a]]!="")
        tostr_Equipment+=Equipment[equipmentab[a]];
      else
        tostr_Equipment+='wq648a52vke1';
      tostr_Equipment+='\'';
      //console.log(Household.name,Household['name'],Household[a],a);
    }
    //console.log(householdtabi,tostr_Household);
    let insert = 'INSERT INTO Equipments ('+equipmenttab+')';
    let value = 'VALUES('+tostr_Equipment+')';
    console.log(Equipment,insert,value);
    db_EquipmentInformation.run(insert+' '+value);
  }catch(err){
    console.log(err);
  }
}

window.GETALL_Equipment = (callback)=>{
  db_EquipmentInformation.all('SELECT * FROM Equipments ORDER BY uid',[],(err,equipment_rows)=>{
    if(err){
      console.log(err);
    }
    callback(equipment_rows);
  });
}

window.DEL_Equipment = (uid)=>{
  db_EquipmentInformation.run('DELETE FROM Equipments WHERE uid = ?',uid,(err)=>{
    if(err){
      console.log(err);
    }
  });
}
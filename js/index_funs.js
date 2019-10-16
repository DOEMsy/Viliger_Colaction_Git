/*
    预加载功能：从数据库读出数据至缓存
*/
var ReadPersons = ()=>{
    /*
    Persons = {
        "1":[
            {name:"老李家",viligers:[{name:"李相赫"},{name:"李？？"}]},
            {name:"老赵家",viligers:[{name:"赵家毅"}]},
            {name:"老王家",viligers:[{name:"隔壁老王"}]}
        ],
        "2":[
            {name:"老周家",viligers:[{name:"上条当麻"},{name:"Index"}]},
            {name:"小赵家",viligers:[{name:"不胜战神"},{name:"秃头披风侠"}]},
            {name:"小王家",viligers:[{name:"王跃霖"}]},
            {name:"小红家",viligers:[{name:"银桑"},{name:"神乐"},{name:"眼镜"},{name:"小春"}]}
        ],
        "3":[
            {name:"小明家",viligers:[{name:"他的后宫们"}]}
        ],
        "4":[
            {name:"小刚家",viligers:[{name:"番外个体"},{name:"10036"},{name:"10037"},{name:"10038"},{name:"10039"},{name:"10040"},{name:"10041"},{name:"10042"},{name:"10043"},{name:"10044"},{name:"10045"}]}
        ]
    };
    */
    maxgroupnum = 0;
    window.GETALL_Group((group_rows)=>{
        console.log(group_rows);
        //Vue.set(Persons_Vue,'Groups',group_rows);
        for(index in group_rows){
            var groupnum = group_rows[index].groupnum;
            var groupname = group_rows[index].groupname;
            Vue.set(Persons_Vue.Groups,groupname,groupnum);
            Vue.set(Persons_Vue.Groups2,groupnum,groupname); 
            console.log('组：',groupnum,groupname);
            Vue.set(Persons_Vue.Persons,groupnum,{});
            if(groupnum>maxgroupnum)    maxgroupnum = groupnum;
            
            window.GET_Household_hasgroupnum(group_rows[index],(household_row)=>{
                var ownerid = household_row.ownerid;
                console.log('户：',household_row);
                Vue.set(Persons_Vue.Persons[household_row.groupnum],ownerid,household_row);
                Vue.set(Persons_Vue.Persons[household_row.groupnum][ownerid],'viligers',{});
                window.GET_Viliger_hasownerid(household_row,(viliger_row)=>{
                    for(obj in viliger_row)
                        if(viliger_row[obj]=='wq648a52vke1')
                            viliger_row[obj]='';
                    console.log('组号',household_row.groupnum,'户主身份证',household_row.ownerid);
                    Vue.set(Persons_Vue.Persons[household_row.groupnum][household_row.ownerid].viligers,viliger_row.id,viliger_row);
                });
            });
        }
    });
}
//preload
ReadPersons();

/*
    辅助功能：判断对象是否为空
*/
var is_obj_empty = (obj)=>{
    for(key in obj){
        return false;
    }
    return true;
}

/*
    按钮功能：添加组
    在缓存数据和数据库中添加一个新组
*/
var Botton_ADD_Group = ()=>{
    try{
        if(Persons_Vue.input_groupname.groupname==''){
            
            var date = new Date();
            var time = date.getHours()+''+date.getMinutes()+date.getSeconds(); 
            $("#bottonaddgpalerts").append("<div class=\""+time+
            " bottonaddgpalert alert alert-warning alert-dismissible fade show\" role=\"alert\">"+
            "<strong>错误</strong> ，组号不能为空！"+
            "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">"+
            "<span aria-hidden=\"true\">&times;</span></button></div>"
            );
            console.log("."+time);
            $("."+time).delay(1500).slideUp( 700 );
            //$("."+time).remove();
        }else{
            $("#newgroupmodal").modal('hide');
            maxgroupnum++;
            var groupname = Persons_Vue.input_groupname.groupname;
            var groupnum = maxgroupnum+'';
            console.log(groupname);
            //Persons[maxgroupnum] = {};
            Vue.set(Persons_Vue.Persons,groupnum,{});
            Vue.set(Persons_Vue.Groups,groupname,groupnum);
            Vue.set(Persons_Vue.Groups2,groupnum,groupname);
            newGroup = {groupnum:groupnum,groupname:groupname};
            window.ADD_Group_sql(newGroup);  
            //alert('新建成功');
        }
    }catch(err){
        console.log(err);
    }
}

/*
    按钮功能：添加户
    将输入缓存推入缓存数据和数据库
    undefined，boolean，number，string，null 等基本数据类型 = 赋值
    对象、数组、函数 = 引用 （相当于地址赋值）
*/
var Botton_ADD_Household = ()=>{
    try{
        if( Persons_Vue.input_message.groupnum==""||
            Persons_Vue.input_message.name==""||
            Persons_Vue.input_message.ownerid==""
        ){
            var date = new Date();
            var time = date.getHours()+''+date.getMinutes()+date.getSeconds(); 
            $("#bottonaddhdalerts").append("<div class=\""+time+
            " bottonaddgpalert alert alert-warning alert-dismissible fade show\" role=\"alert\">"+
            "<strong>错误</strong> ，户主姓名、身份证、组号为必填项"+
            "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">"+
            "<span aria-hidden=\"true\">&times;</span></button></div>"
            );
            console.log("."+time);
            $("."+time).delay(1500).slideUp( 700 );
        }else{
            $("#newhouseholdmodal").modal('hide');
            console.log(Persons_Vue.input_message);
            let input_message = Persons_Vue.input_message;
            let newhousehold={};
            for(obj in input_message)   newhousehold[obj] = input_message[obj]+'';
            newhousehold.groupnum = Persons_Vue.Groups[newhousehold.groupnum];
            console.log(newhousehold);
            Vue.set(Persons_Vue.Persons[newhousehold.groupnum],newhousehold.ownerid,newhousehold);
            window.ADD_Household_sql(newhousehold);
            Vue.set(Persons_Vue.Persons[newhousehold.groupnum][newhousehold.ownerid],'viligers',{});
            /*
            for(obj in Persons_Vue.input_message)
                Vue.set(Persons_Vue.input_message,obj,'');
            */
        }
    }catch(err){
        console.log(err);
    }
}

/*
    按钮功能：添加人
*/
var Botton_ADD_Viliger = ()=>{
    try{
        if( Persons_Vue.input_viliger.name==""||
            Persons_Vue.input_viliger.id==""||
            Persons_Vue.input_viliger.relation==""
        ){
            var date = new Date();
            var time = date.getHours()+''+date.getMinutes()+date.getSeconds(); 
            $("#bottonaddvgalerts").append("<div class=\""+time+
            " bottonaddgpalert alert alert-warning alert-dismissible fade show\" role=\"alert\">"+
            "<strong>错误</strong> ，村民姓名、身份证、与户主关系为必填项"+
            "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">"+
            "<span aria-hidden=\"true\">&times;</span></button></div>"
            );
            console.log("."+time);
            $("."+time).delay(1500).slideUp( 700 );
        }else{
            $("#newviligermodal").modal('hide');
            console.log(Persons_Vue.input_viliger);
            let input_viliger = Persons_Vue.input_viliger;
            let newviliger={};
            for(obj in input_viliger)   newviliger[obj] = input_viliger[obj];
            var ownerid = Persons_Vue.print_message.ownerid;
            var groupnum = Persons_Vue.print_message.groupnum;
            newviliger.ownerid = ownerid;
            console.log(groupnum,ownerid,newviliger);
            Vue.set(Persons_Vue.Persons[groupnum][ownerid].viligers,newviliger.id,newviliger);
            window.ADD_Viliger_sql(newviliger);
        }
    }catch(err){
        console.log(err);
    }
}

/*
    按钮功能：删除组
    删除指定组，如果非空则反馈无法删除
*/
var Botton_DEL_Group = (groupnum)=>{
    try{
        let hasobj = 0;
        for(obj in Persons_Vue.Persons[groupnum]){
            hasobj++;
            console.log(obj,Persons_Vue.Persons[groupnum][obj]);
        }
        if(hasobj!=0){
            console.log('没有删除group',index,'hasobj:',hasobj);
            alert('组不是空的 无法删除！');
        }else{
            Vue.delete(Persons_Vue.Persons,groupnum);
            Vue.delete(Persons_Vue.Groups,Persons_Vue.Groups2[groupnum]);
            Vue.delete(Persons_Vue.Groups2,groupnum);
            window.DEL_Group(groupnum);
            //Persons_Vue.Groups.splice(index,1);
        }
    }catch(err){
        console.log(err);
    }
}   

/*
    按钮功能：删除村民
    删除目标id的村民
*/
var Botton_DEL_Viliger = (id)=>{
    try{
        var groupnum = Persons_Vue.print_message.groupnum;
        var ownerid = Persons_Vue.print_message.ownerid;
        Vue.delete(Persons_Vue.Persons[groupnum][ownerid].viligers,id);
        window.DEL_Viliger(id);
    }catch(err){
        console.log(err);
    }
}

/*
    按钮功能：删除户
    删除目标ownerid的户
*/
var Botton_DEL_Household = (ownerid)=>{
    try{
        var groupnum = Persons_Vue.print_message.groupnum;
        Vue.delete(Persons_Vue.Persons[groupnum],ownerid);
        window.DEL_Viliger_hasownerid(ownerid);
        window.DEL_Household(ownerid);
    }catch(err){
        console.log(err);
    }
}

/* 
    按钮功能：修改户信息
*/
var Botton_Cg_Household = ()=>{
    try{
        if( Persons_Vue.input_message.groupnum==""||
            Persons_Vue.input_message.name==""||
            Persons_Vue.input_message.ownerid==""
        ){
            var date = new Date();
            var time = date.getHours()+''+date.getMinutes()+date.getSeconds(); 
            $("#bottonrehdalerts").append("<div class=\""+time+
            " bottonaddgpalert alert alert-warning alert-dismissible fade show\" role=\"alert\">"+
            "<strong>错误</strong> ，户主姓名、身份证、组号为必填项"+
            "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">"+
            "<span aria-hidden=\"true\">&times;</span></button></div>"
            );
            console.log("."+time);
            $("."+time).delay(1500).slideUp( 700 );
        }else{
            $("#rehouseholdmodal").modal('hide');
            console.log('input_message',Persons_Vue.input_message);
            let ownerid = Persons_Vue.print_message.ownerid;
            //console.log(ownerid);
            Botton_DEL_Household(ownerid);
            let input_message = Persons_Vue.input_message;
            let newhousehold={};
            for(obj in input_message)   newhousehold[obj] = input_message[obj]+'';
            newhousehold.groupnum = Persons_Vue.Groups[newhousehold.groupnum];
            console.log('newhousehold',newhousehold);
            Vue.set(Persons_Vue.Persons[newhousehold.groupnum],newhousehold.ownerid,newhousehold);
            window.ADD_Household_sql(newhousehold);
            Vue.set(Persons_Vue,'print_message',newhousehold);
            for(obj in Persons_Vue.print_message){
                if(Persons_Vue.print_message[obj]==='wq648a52vke1')
                    Vue.set(Persons_Vue.print_message,obj,'');
            }
            /*
            for(obj in Persons_Vue.input_message)
                Vue.set(Persons_Vue.input_message,obj,'');
            */
        }
    }catch(err){
        console.log(err);
    }
}
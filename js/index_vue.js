var Persons_Vue = new Vue({
    el:"#PersonInformation",
    data:{
        Persons:{}, //村民们
        Groups:{},   //组名索引 [groupname] -> groupnum
        Groups2:{},  //组名保存 ['g'+groupnum] -> groupname
        input_message:{             //输入新户的缓存数据
            'name':'','sex':'','birthday':'','race':''
            ,'political':'','education':'','job':''
            ,'ownerid':'','phone':'','fc':'','familynum':''
            ,'photo':'','income':'','fielding':''
            ,'breeding':'','causeofpoverty':''
            ,'remark':'','groupnum':'','viligers':''
        },
        print_message:{             //展示户的缓存数据
            'name':'','sex':'','birthday':'','race':''
            ,'political':'','education':'','job':''
            ,'ownerid':'','phone':'','fc':'','familynum':''
            ,'photo':'','income':'','fielding':''
            ,'breeding':'','causeofpoverty':''
            ,'remark':'','groupnum':'','viligers':''
        },
        input_groupname:{
            'groupname':''
        },
        input_viliger:{
            'name':'',
            'ownerid':'',
            'sex':'',
            'relation':'',
            'job':'',
            'birthday':'',
            'id':''
        }
    },
    methods:{
        Botton_ADD_Group:function(){Botton_ADD_Group();},           //对接按钮功能：添加新组
        Botton_ADD_Household:function(){Botton_ADD_Household();},   //对接按钮功能：添加新户
        Botton_ADD_Viliger:function(){Botton_ADD_Viliger();},       //对接按钮功能：添加新人
        Botton_Change_Print:function(household){                    //按钮功能：改变展示户
            if(household.groupnum!=Persons_Vue.print_message.groupnum||household.ownerid!=Persons_Vue.print_message.ownerid){
                $('#housholdinfodisplay').fadeOut('fast',()=>{
                    Vue.set(Persons_Vue,'print_message',household);
                    for(obj in Persons_Vue.print_message){
                        if(Persons_Vue.print_message[obj]==='wq648a52vke1')
                            Vue.set(Persons_Vue.print_message,obj,'');
                    }
                });
                $('#housholdinfodisplay').fadeIn();
            }else{
                console.log('再次点击相同');
            }
        },
        Botton_Refrash_input_message:function(){                    //按钮功能：刷新输入缓存，响应按钮打开户添加框
            for(obj in Persons_Vue.input_message)
                Vue.set(Persons_Vue.input_message,obj,'');
            if(is_obj_empty(Persons_Vue.Persons)){
                Alert("错误","请先建立一个组","warning");
            }else{
                $('#newhouseholdmodal').modal({
                    backdrop: 'static',
                    keyboard: true
                });
            }
        },
        Botton_Refrash_input_groupname:function(){                  //按钮功能：刷新组名输入缓存，响应按钮打开组添加框
            for(obj in Persons_Vue.input_groupname)
                Vue.set(Persons_Vue.input_groupname,obj,'');
            $('#newgroupmodal').modal({
                backdrop: 'static',
                keyboard: true
            });
        },
        Botton_Refrash_input_viliger:function(){                    //按钮功能功能：刷新村民输入缓存，响应按钮打开村民添加框
            for(obj in Persons_Vue.input_viliger)
                Vue.set(Persons_Vue.input_viliger,obj,'');
            $('#newviligermodal').modal({
                backdrop: 'static',
                keyboard: true
            });
        },
        Botton_DEL_Group:function(groupnum){Botton_DEL_Group(groupnum);},   //对接按钮功能：删除组
        Botton_DEL_Viliger:function(id){Botton_DEL_Viliger(id);},            //对接按钮功能：删除村民
        Botton_DEL_Household:function(ownerid){$('#housholdinfodisplay').fadeOut(Botton_DEL_Household(ownerid));},//对接按钮功能：删除户
        Botton_Re_Household:function(){                                        //按钮功能：输出缓存->输入缓存，响应按钮打开户修改框
            for(obj in Persons_Vue.input_message)
                Vue.set(Persons_Vue.input_message,obj,Persons_Vue.print_message[obj]);
            Persons_Vue.input_message.groupnum = Persons_Vue.Groups2['g'+Persons_Vue.input_message.groupnum];
            console.log(this.input_message,this.print_message);
            $('#rehouseholdmodal').modal({
                backdrop: 'static',
                keyboard: true
            });
        },
        Botton_Cg_Household:function(){                                     //对接按钮功能：确认修改户
            $('#housholdinfodisplay').fadeOut(Botton_Cg_Household());
            $('#housholdinfodisplay').fadeIn();
        },
        Groupcolor:function(groupnum){                                      //辅助功能：根据组状态返回组颜色
            if(is_obj_empty(Persons_Vue.Persons[groupnum])){
                return 'opacity:0.5;';
            }
            else{
                return 'opacity:1.0;';
            }
        }
    }
});


var Construction_Vue = new Vue({
    el:'#ConstructionInformation',
    data:{
        Constructions:{},
        input_message:{
            'uid':'',  //识别码
            'name':'', //项目名称
            'ownername':'',  //负责人姓名
            'ownerphone':'',  //负责人电话
            'unit':'',        //申请单位
            'unitphone':'',   //单位电话
            'begindate':'',   //开始日期
            'message':'',     //项目进度和信息
            'remark':''       //备注
        }
    },
    methods:{
        Botton_ADD_Construction:()=>{
            if( Construction_Vue.input_message.name==""||
                Construction_Vue.input_message.begindate==""||
                Construction_Vue.input_message.ownername==""||
                Construction_Vue.input_message.ownerphone==""
            ){
                Alert("错误","项目名称、申请日期、负责人姓名、负责人电话为必填项","warning","#bottonaddctalert");
            }else{
                $("#newconstructionmodal").modal('hide');
                console.log(Construction_Vue.input_message);
                maxuid++;
                let input_message = Construction_Vue.input_message;
                let newconstruction={};
                for(obj in input_message)   newconstruction[obj] = input_message[obj];
                newconstruction.uid = maxuid;
                console.log(newconstruction);
                Vue.set(Construction_Vue.Constructions,newconstruction.uid,newconstruction);
                window.ADD_Construction_sql(newconstruction);
                Alert("成功","创建项目\""+newconstruction.name+"\"成功","success"); 
                /*
                for(obj in Persons_Vue.input_message)
                    Vue.set(Persons_Vue.input_message,obj,'');
                */
            }
        },
        Botton_Refrash_input_message:()=>{
            for(obj in Construction_Vue.input_message)
                Vue.set(Construction_Vue.input_message,obj,'');
            $('#newconstructionmodal').modal({
                backdrop: 'static',
                keyboard: true
            });
        },
        Botton_DEL_Construction:(uid)=>{
            var name = Construction_Vue.Constructions[uid].name;
            Vue.delete(Construction_Vue.Constructions,uid);
            window.DEL_Construction(uid);
            Alert("成功","删除项目\""+name+"\"成功","success");
        },
        Botton_Re_Construction:(uid)=>{                                        //按钮功能：输出缓存->输入缓存，响应按钮打开户修改框
            for(obj in Construction_Vue.input_message)
                Vue.set(Construction_Vue.input_message,obj,Construction_Vue.Constructions[uid][obj]);
            $('#reconstructionmodal').modal({
                backdrop: 'static',
                keyboard: true
            });
        },
        Botton_Cg_Construction:()=>{
            if( Construction_Vue.input_message.name==""||
                Construction_Vue.input_message.begindate==""||
                Construction_Vue.input_message.ownername==""||
                Construction_Vue.input_message.ownerphone==""
            ){  
                Alert("错误","项目名称、申请日期、负责人姓名、负责人电话为必填项","warning","#bottoncgctalert");
            }else{
                $("#reconstructionmodal").modal('hide');
                var uid = Construction_Vue.input_message.uid;
                window.DEL_Construction(uid);
                console.log(Construction_Vue.input_message,uid,Construction_Vue.Constructions[uid]);
                for(obj in Construction_Vue.input_message)
                    Vue.set(Construction_Vue.Constructions[uid],obj,Construction_Vue.input_message[obj]);
                window.ADD_Construction_sql(Construction_Vue.Constructions[uid]);
                Alert("成功","修改户项目成功","success");
                /*
                for(obj in Persons_Vue.input_message)
                    Vue.set(Persons_Vue.input_message,obj,'');
                */
            }
        },
        Botton_Dis_Construction_message:(uid)=>{
            Construction_Vue.input_message.uid = uid;
            Construction_Vue.input_message.message = Construction_Vue.Constructions[uid].message;
            $('#displayconstructionmessagemodal').modal({
                backdrop: 'static',
                keyboard: true
            });
        },
        Botton_Cg_Construction_message:(uid)=>{
            $("#displayconstructionmessagemodal").modal('hide');
            if(Construction_Vue.Constructions[uid].message != Construction_Vue.input_message.message){
                Construction_Vue.Constructions[uid].message = Construction_Vue.input_message.message
                window.Update_Construction_message(uid,Construction_Vue.Constructions[uid].message);
                Alert("成功","更新项目信息","success");
            }else{

            }
        }
    }
});


var Equipment_Vue = new Vue({
    el:'#EquipmentsInformation',
    data:{
        Equipments:{},
        input_message:{
            'uid':'',  //识别码
            'name':'', //项目名称
            'ownername':'',  //负责人姓名
            'ownerphone':'',  //负责人电话
            'begindate':'',   //登记日期
            'message':'',     //信息
            'remark':''       //备注
        }
    },
    methods:{
        Botton_ADD_Equipment:()=>{
            if( Equipment_Vue.input_message.name==""||
                Equipment_Vue.input_message.begindate==""||
                Equipment_Vue.input_message.ownername==""||
                Equipment_Vue.input_message.ownerphone==""
            ){
                Alert("错误","设备名称、登记日期、负责人姓名、负责人电话为必填项","warning","#bottonaddeqalert");
            }else{
                $("#newequipmentmodal").modal('hide');
                console.log(Equipment_Vue.input_message);
                maxuid++;
                let input_message = Equipment_Vue.input_message;
                let newequipment={};
                for(obj in input_message)   newequipment[obj] = input_message[obj];
                newequipment.uid = maxuid;
                console.log(newequipment);
                Vue.set(Equipment_Vue.Equipments,newequipment.uid,newequipment);
                window.ADD_Equipment_sql(newequipment);
                Alert("成功","创建项目\""+newequipment.name+"\"成功","success"); 
                /*
                for(obj in Persons_Vue.input_message)
                    Vue.set(Persons_Vue.input_message,obj,'');
                */
            }
        },
        Botton_Refrash_input_message:()=>{
            for(obj in Equipment_Vue.input_message)
                Vue.set(Equipment_Vue.input_message,obj,'');
            $('#newequipmentmodal').modal({
                backdrop: 'static',
                keyboard: true
            });
        },
        Botton_DEL_Equipment:(uid)=>{
            var name = Equipment_Vue.Equipments[uid].name;
            Vue.delete(Equipment_Vue.Equipments,uid);
            window.DEL_Equipment(uid);
            Alert("成功","删除项目\""+name+"\"成功","success");
        },
        Botton_Re_Equipment:(uid)=>{                                        //按钮功能：输出缓存->输入缓存，响应按钮打开户修改框
            for(obj in Equipment_Vue.input_message)
                Vue.set(Equipment_Vue.input_message,obj,Equipment_Vue.Equipments[uid][obj]);
            $('#reequipmentmodal').modal({
                backdrop: 'static',
                keyboard: true
            });
        },
        Botton_Cg_Equipment:()=>{
            if( Equipment_Vue.input_message.name==""||
                Equipment_Vue.input_message.begindate==""||
                Equipment_Vue.input_message.ownername==""||
                Equipment_Vue.input_message.ownerphone==""
            ){  
                Alert("错误","设备名称、登记日期、负责人姓名、负责人电话为必填项","warning","#bottoncgeqalert");
            }else{
                $("#reequipmentmodal").modal('hide');
                var uid = Equipment_Vue.input_message.uid;
                window.DEL_Equipment(uid);
                console.log(Equipment_Vue.input_message,uid,Equipment_Vue.Equipments[uid]);
                for(obj in Equipment_Vue.input_message)
                    Vue.set(Equipment_Vue.Equipments[uid],obj,Equipment_Vue.input_message[obj]);
                window.ADD_Equipment_sql(Equipment_Vue.Equipments[uid]);
                Alert("成功","修改户项目成功","success");
                /*
                for(obj in Persons_Vue.input_message)
                    Vue.set(Persons_Vue.input_message,obj,'');
                */
            }
        },
        Botton_Dis_Equipment_message:(uid)=>{
            Equipment_Vue.input_message.uid = uid;
            Equipment_Vue.input_message.message = Equipment_Vue.Equipments[uid].message;
            $('#displayequipmentmessagemodal').modal({
                backdrop: 'static',
                keyboard: true
            });
        },
        Botton_Cg_Equipment_message:(uid)=>{
            $("#displayequipmentmessagemodal").modal('hide');
            if(Equipment_Vue.Equipments[uid].message != Equipment_Vue.input_message.message){
                Equipment_Vue.Equipments[uid].message = Equipment_Vue.input_message.message
                window.Update_Equipment_message(uid,Equipment_Vue.Equipments[uid].message);
                Alert("成功","更新设备信息","success");
            }else{

            }
        }
    }
});
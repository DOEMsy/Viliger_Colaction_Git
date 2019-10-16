var Persons_Vue = new Vue({
    el:"#PersonInformation",
    data:{
        Persons:{}, //村民们
        Groups:[],   //组名索引 [groupname] -> groupnum
        Groups2:[],  //组名保存 [groupnum] -> groupname
        input_message:{             //输入新户的缓存数据
            'name':'','sex':'','birthday':'','race':''
            ,'political':'','education':'','job':''
            ,'ownerid':'','phone':'','fc':'','familynum':''
            ,'photo':'','income':'','fielding':''
            ,'breeding':'','causeofpoverty':''
            ,'remark':'','groupnum':''
        },
        print_message:{             //展示户的缓存数据
            'name':'','sex':'','birthday':'','race':''
            ,'political':'','education':'','job':''
            ,'ownerid':'','phone':'','fc':'','familynum':''
            ,'photo':'','income':'','fielding':''
            ,'breeding':'','causeofpoverty':''
            ,'remark':'','groupnum':''
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
            if(household.groupnum!=Persons_Vue.print_message.groupnum&&household.ownerid!=Persons_Vue.print_message.ownerid){
                $('#housholdinfodisplay').fadeOut(()=>{
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
            if(is_obj_empty(Persons_Vue.Persons))   alert('请在添加户之前新建一个组');
            else{
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
            Persons_Vue.input_message.groupnum = Persons_Vue.Groups2[Persons_Vue.input_message.groupnum];
            console.log(this.input_message,this.print_message);
            $('#rehouseholdmodal').modal({
                backdrop: 'static',
                keyboard: true
            });
        },
        Botton_Cg_Household:function(){
            $('#housholdinfodisplay').fadeOut(Botton_Cg_Household());
            $('#housholdinfodisplay').fadeIn();
        }
    }
});


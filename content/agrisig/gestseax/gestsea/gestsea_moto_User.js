/*************************************************
  REQUETES UTILSATEUR : Onglet : Activit�s
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Activit�s_Liste_des_activit�s0(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 10

Id dans le tab: 10;
simple
Nbr Jointure: 1;
    Joint n� 0 = tache,zt_numero,zt_numero

Id dans le tab: 11;
simple
Nbr Jointure: 1;
    Joint n� 0 = sujet,zs_numero,zs_numero

Id dans le tab: 12;
simple
Nbr Jointure: 1;
    Joint n� 0 = lieu,zl_numero,zl_numero

Id dans le tab: 13;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 14;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 15;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 16;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 17;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 18;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 19;
simple
Nbr Jointure: 1;
    Joint n� 0 = groupe,zg_numero,zg_numero

******************
*/

 var Table="activite";
 var CleMaitre = TAB_COMPO_PPTES[3].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var zt_numero=GetValAt(10);
 if (zt_numero=="-1")
    zt_numero="null";
 if (!ValiderChampsObligatoire(Table,"zt_numero",TAB_GLOBAL_COMPO[10],zt_numero,true))
 	return -1;
 var zs_numero=GetValAt(11);
 if (zs_numero=="-1")
    zs_numero="null";
 if (!ValiderChampsObligatoire(Table,"zs_numero",TAB_GLOBAL_COMPO[11],zs_numero,true))
 	return -1;
 var zl_numero=GetValAt(12);
 if (zl_numero=="-1")
    zl_numero="null";
 if (!ValiderChampsObligatoire(Table,"zl_numero",TAB_GLOBAL_COMPO[12],zl_numero,true))
 	return -1;
 var za_duree=GetValAt(13);
 if (!ValiderChampsObligatoire(Table,"za_duree",TAB_GLOBAL_COMPO[13],za_duree,false))
 	return -1;
 if (!ValiderChampsType(Table,"za_duree",TAB_GLOBAL_COMPO[13],za_duree))
 	return -1;
 var za_date=GetValAt(14);
 if (!ValiderChampsObligatoire(Table,"za_date",TAB_GLOBAL_COMPO[14],za_date,false))
 	return -1;
 if (!ValiderChampsType(Table,"za_date",TAB_GLOBAL_COMPO[14],za_date))
 	return -1;
 var za_heuredebut=GetValAt(15);
 if (!ValiderChampsObligatoire(Table,"za_heuredebut",TAB_GLOBAL_COMPO[15],za_heuredebut,false))
 	return -1;
 if (!ValiderChampsType(Table,"za_heuredebut",TAB_GLOBAL_COMPO[15],za_heuredebut))
 	return -1;
 var za_heurefin=GetValAt(16);
 if (!ValiderChampsObligatoire(Table,"za_heurefin",TAB_GLOBAL_COMPO[16],za_heurefin,false))
 	return -1;
 if (!ValiderChampsType(Table,"za_heurefin",TAB_GLOBAL_COMPO[16],za_heurefin))
 	return -1;
 var za_qui=GetValAt(17);
 if (!ValiderChampsObligatoire(Table,"za_qui",TAB_GLOBAL_COMPO[17],za_qui,false))
 	return -1;
 if (!ValiderChampsType(Table,"za_qui",TAB_GLOBAL_COMPO[17],za_qui))
 	return -1;
 var za_champ=GetValAt(18);
 if (!ValiderChampsObligatoire(Table,"za_champ",TAB_GLOBAL_COMPO[18],za_champ,false))
 	return -1;
 if (!ValiderChampsType(Table,"za_champ",TAB_GLOBAL_COMPO[18],za_champ))
 	return -1;
 var zg_numero=GetValAt(19);
 if (zg_numero=="-1")
    zg_numero="null";
 if (!ValiderChampsObligatoire(Table,"zg_numero",TAB_GLOBAL_COMPO[19],zg_numero,true))
 	return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",zt_numero,zs_numero,zl_numero,za_duree,za_date,za_heuredebut,za_heurefin,za_qui,za_champ,zg_numero"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+zt_numero+","+zs_numero+","+zl_numero+","+(za_duree=="" ? "null" : "'"+ValiderChaine(za_duree)+"'" )+","+(za_date=="" ? "null" : "'"+ValiderChaine(za_date)+"'" )+","+(za_heuredebut=="" ? "null" : "'"+ValiderChaine(za_heuredebut)+"'" )+","+(za_heurefin=="" ? "null" : "'"+ValiderChaine(za_heurefin)+"'" )+","+(za_qui=="" ? "null" : "'"+ValiderChaine(za_qui)+"'" )+","+(za_champ=="" ? "null" : "'"+ValiderChaine(za_champ)+"'" )+","+zg_numero+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
	alert("Echec lors de l'insertion");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Activit�s
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Activit�s_Liste_des_activit�s0(Compo_Maitre)
{
 var Table="activite";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;

 if (pgsql_update(Req)==0)
	alert("Echec lors de la supression");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Activit�s
  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR 
***************************************************/
function User_Update_Activit�s_Liste_des_activit�s0(Compo_Maitre)
{
 var Table="activite";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var zt_numero=GetValAt(10);
 if (zt_numero=="-1")
    zt_numero="null";
 if (!ValiderChampsObligatoire(Table,"zt_numero",TAB_GLOBAL_COMPO[10],zt_numero,true))
 	return -1;
 var zs_numero=GetValAt(11);
 if (zs_numero=="-1")
    zs_numero="null";
 if (!ValiderChampsObligatoire(Table,"zs_numero",TAB_GLOBAL_COMPO[11],zs_numero,true))
 	return -1;
 var zl_numero=GetValAt(12);
 if (zl_numero=="-1")
    zl_numero="null";
 if (!ValiderChampsObligatoire(Table,"zl_numero",TAB_GLOBAL_COMPO[12],zl_numero,true))
 	return -1;
 var za_duree=GetValAt(13);
 if (!ValiderChampsObligatoire(Table,"za_duree",TAB_GLOBAL_COMPO[13],za_duree,false))
 	return -1;
 if (!ValiderChampsType(Table,"za_duree",TAB_GLOBAL_COMPO[13],za_duree))
 	return -1;
 var za_date=GetValAt(14);
 if (!ValiderChampsObligatoire(Table,"za_date",TAB_GLOBAL_COMPO[14],za_date,false))
 	return -1;
 if (!ValiderChampsType(Table,"za_date",TAB_GLOBAL_COMPO[14],za_date))
 	return -1;
 var za_heuredebut=GetValAt(15);
 if (!ValiderChampsObligatoire(Table,"za_heuredebut",TAB_GLOBAL_COMPO[15],za_heuredebut,false))
 	return -1;
 if (!ValiderChampsType(Table,"za_heuredebut",TAB_GLOBAL_COMPO[15],za_heuredebut))
 	return -1;
 var za_heurefin=GetValAt(16);
 if (!ValiderChampsObligatoire(Table,"za_heurefin",TAB_GLOBAL_COMPO[16],za_heurefin,false))
 	return -1;
 if (!ValiderChampsType(Table,"za_heurefin",TAB_GLOBAL_COMPO[16],za_heurefin))
 	return -1;
 var za_qui=GetValAt(17);
 if (!ValiderChampsObligatoire(Table,"za_qui",TAB_GLOBAL_COMPO[17],za_qui,false))
 	return -1;
 if (!ValiderChampsType(Table,"za_qui",TAB_GLOBAL_COMPO[17],za_qui))
 	return -1;
 var za_champ=GetValAt(18);
 if (!ValiderChampsObligatoire(Table,"za_champ",TAB_GLOBAL_COMPO[18],za_champ,false))
 	return -1;
 if (!ValiderChampsType(Table,"za_champ",TAB_GLOBAL_COMPO[18],za_champ))
 	return -1;
 var zg_numero=GetValAt(19);
 if (zg_numero=="-1")
    zg_numero="null";
 if (!ValiderChampsObligatoire(Table,"zg_numero",TAB_GLOBAL_COMPO[19],zg_numero,true))
 	return -1;
 var Req="update "+Table+" set ";
 Req+="zt_numero="+zt_numero+",zs_numero="+zs_numero+",zl_numero="+zl_numero+",za_duree="+(za_duree=="" ? "null" : "'"+ValiderChaine(za_duree)+"'" )+",za_date="+(za_date=="" ? "null" : "'"+ValiderChaine(za_date)+"'" )+",za_heuredebut="+(za_heuredebut=="" ? "null" : "'"+ValiderChaine(za_heuredebut)+"'" )+",za_heurefin="+(za_heurefin=="" ? "null" : "'"+ValiderChaine(za_heurefin)+"'" )+",za_qui="+(za_qui=="" ? "null" : "'"+ValiderChaine(za_qui)+"'" )+",za_champ="+(za_champ=="" ? "null" : "'"+ValiderChaine(za_champ)+"'" )+",zg_numero="+zg_numero+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
	alert("Echec lors de la mise � jour");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : T�ches
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_T�ches_Liste_des_t�ches0(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 3

Id dans le tab: 22;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 23;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 24;
simple
Nbr Jointure: PAS DE JOINTURE;

******************
*/

 var Table="tache";
 var CleMaitre = TAB_COMPO_PPTES[20].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var zt_libelle=GetValAt(22);
 if (!ValiderChampsObligatoire(Table,"zt_libelle",TAB_GLOBAL_COMPO[22],zt_libelle,false))
 	return -1;
 if (!ValiderChampsType(Table,"zt_libelle",TAB_GLOBAL_COMPO[22],zt_libelle))
 	return -1;
 var zt_phrase=GetValAt(23);
 if (!ValiderChampsObligatoire(Table,"zt_phrase",TAB_GLOBAL_COMPO[23],zt_phrase,false))
 	return -1;
 if (!ValiderChampsType(Table,"zt_phrase",TAB_GLOBAL_COMPO[23],zt_phrase))
 	return -1;
 var zt_notes=GetValAt(24);
 if (!ValiderChampsObligatoire(Table,"zt_notes",TAB_GLOBAL_COMPO[24],zt_notes,false))
 	return -1;
 if (!ValiderChampsType(Table,"zt_notes",TAB_GLOBAL_COMPO[24],zt_notes))
 	return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",zt_libelle,zt_phrase,zt_notes"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+(zt_libelle=="" ? "null" : "'"+ValiderChaine(zt_libelle)+"'" )+","+(zt_phrase=="" ? "null" : "'"+ValiderChaine(zt_phrase)+"'" )+","+(zt_notes=="" ? "null" : "'"+ValiderChaine(zt_notes)+"'" )+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
	alert("Echec lors de l'insertion");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : T�ches
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_T�ches_Liste_des_t�ches0(Compo_Maitre)
{
 var Table="tache";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;

 if (pgsql_update(Req)==0)
	alert("Echec lors de la supression");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : T�ches
  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR 
***************************************************/
function User_Update_T�ches_Liste_des_t�ches0(Compo_Maitre)
{
 var Table="tache";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var zt_libelle=GetValAt(22);
 if (!ValiderChampsObligatoire(Table,"zt_libelle",TAB_GLOBAL_COMPO[22],zt_libelle,false))
 	return -1;
 if (!ValiderChampsType(Table,"zt_libelle",TAB_GLOBAL_COMPO[22],zt_libelle))
 	return -1;
 var zt_phrase=GetValAt(23);
 if (!ValiderChampsObligatoire(Table,"zt_phrase",TAB_GLOBAL_COMPO[23],zt_phrase,false))
 	return -1;
 if (!ValiderChampsType(Table,"zt_phrase",TAB_GLOBAL_COMPO[23],zt_phrase))
 	return -1;
 var zt_notes=GetValAt(24);
 if (!ValiderChampsObligatoire(Table,"zt_notes",TAB_GLOBAL_COMPO[24],zt_notes,false))
 	return -1;
 if (!ValiderChampsType(Table,"zt_notes",TAB_GLOBAL_COMPO[24],zt_notes))
 	return -1;
 var Req="update "+Table+" set ";
 Req+="zt_libelle="+(zt_libelle=="" ? "null" : "'"+ValiderChaine(zt_libelle)+"'" )+",zt_phrase="+(zt_phrase=="" ? "null" : "'"+ValiderChaine(zt_phrase)+"'" )+",zt_notes="+(zt_notes=="" ? "null" : "'"+ValiderChaine(zt_notes)+"'" )+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
	alert("Echec lors de la mise � jour");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Sujets
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Sujets_Liste_des_types_de_sujets0(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 3

Id dans le tab: 31;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 32;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 33;
complexe
Nbr Jointure: 1;
    Joint n� 0 = sujet,zu_numero,zu_numero

******************
*/

 var Table="typesujet";
 var CleMaitre = TAB_COMPO_PPTES[29].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var zu_libelle=GetValAt(31);
 if (!ValiderChampsObligatoire(Table,"zu_libelle",TAB_GLOBAL_COMPO[31],zu_libelle,false))
 	return -1;
 if (!ValiderChampsType(Table,"zu_libelle",TAB_GLOBAL_COMPO[31],zu_libelle))
 	return -1;
 var zu_notes=GetValAt(32);
 if (!ValiderChampsObligatoire(Table,"zu_notes",TAB_GLOBAL_COMPO[32],zu_notes,false))
 	return -1;
 if (!ValiderChampsType(Table,"zu_notes",TAB_GLOBAL_COMPO[32],zu_notes))
 	return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",zu_libelle,zu_notes"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+(zu_libelle=="" ? "null" : "'"+ValiderChaine(zu_libelle)+"'" )+","+(zu_notes=="" ? "null" : "'"+ValiderChaine(zu_notes)+"'" )+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
	alert("Echec lors de l'insertion");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Sujets
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Sujets_Liste_des_types_de_sujets0(Compo_Maitre)
{
 var Table="typesujet";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;

 if (pgsql_update(Req)==0)
	alert("Echec lors de la supression");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Sujets
  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR 
***************************************************/
function User_Update_Sujets_Liste_des_types_de_sujets0(Compo_Maitre)
{
 var Table="typesujet";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var zu_libelle=GetValAt(31);
 if (!ValiderChampsObligatoire(Table,"zu_libelle",TAB_GLOBAL_COMPO[31],zu_libelle,false))
 	return -1;
 if (!ValiderChampsType(Table,"zu_libelle",TAB_GLOBAL_COMPO[31],zu_libelle))
 	return -1;
 var zu_notes=GetValAt(32);
 if (!ValiderChampsObligatoire(Table,"zu_notes",TAB_GLOBAL_COMPO[32],zu_notes,false))
 	return -1;
 if (!ValiderChampsType(Table,"zu_notes",TAB_GLOBAL_COMPO[32],zu_notes))
 	return -1;
 var Req="update "+Table+" set ";
 Req+="zu_libelle="+(zu_libelle=="" ? "null" : "'"+ValiderChaine(zu_libelle)+"'" )+",zu_notes="+(zu_notes=="" ? "null" : "'"+ValiderChaine(zu_notes)+"'" )+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
	alert("Echec lors de la mise � jour");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Sujets
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Sujets_Sujets_3(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 2

Id dans le tab: 35;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 36;
simple
Nbr Jointure: PAS DE JOINTURE;

******************
*/

 var Table="sujet";
 var CleMaitre = TAB_COMPO_PPTES[33].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 /* COMPOSANT LISTE AVEC JOINTURE SIMPLE */
 var zs_libelle=GetValAt(35);
 if (!ValiderChampsObligatoire(Table,"zs_libelle",TAB_GLOBAL_COMPO[35],zs_libelle,false))
 	return -1;
 if (!ValiderChampsType(Table,"zs_libelle",TAB_GLOBAL_COMPO[35],zs_libelle))
 	return -1;
 var zs_notes=GetValAt(36);
 if (!ValiderChampsObligatoire(Table,"zs_notes",TAB_GLOBAL_COMPO[36],zs_notes,false))
 	return -1;
 if (!ValiderChampsType(Table,"zs_notes",TAB_GLOBAL_COMPO[36],zs_notes))
 	return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",zu_numero,zs_libelle,zs_notes"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+TAB_COMPO_PPTES[29].NewCle+","+(zs_libelle=="" ? "null" : "'"+ValiderChaine(zs_libelle)+"'" )+","+(zs_notes=="" ? "null" : "'"+ValiderChaine(zs_notes)+"'" )+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
	alert("Echec lors de l'insertion");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Sujets
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Sujets_Sujets_3(Compo_Maitre)
{
 var Table="sujet";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;

 if (pgsql_update(Req)==0)
	alert("Echec lors de la supression");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Sujets
  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR 
***************************************************/
function User_Update_Sujets_Sujets_3(Compo_Maitre)
{
 var Table="sujet";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var zs_libelle=GetValAt(35);
 if (!ValiderChampsObligatoire(Table,"zs_libelle",TAB_GLOBAL_COMPO[35],zs_libelle,false))
 	return -1;
 if (!ValiderChampsType(Table,"zs_libelle",TAB_GLOBAL_COMPO[35],zs_libelle))
 	return -1;
 var zs_notes=GetValAt(36);
 if (!ValiderChampsObligatoire(Table,"zs_notes",TAB_GLOBAL_COMPO[36],zs_notes,false))
 	return -1;
 if (!ValiderChampsType(Table,"zs_notes",TAB_GLOBAL_COMPO[36],zs_notes))
 	return -1;
 var Req="update "+Table+" set ";
 Req+="zs_libelle="+(zs_libelle=="" ? "null" : "'"+ValiderChaine(zs_libelle)+"'" )+",zs_notes="+(zs_notes=="" ? "null" : "'"+ValiderChaine(zs_notes)+"'" )+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
	alert("Echec lors de la mise � jour");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Groupe
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Groupe_Liste_des_groupes0(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 2

Id dans le tab: 39;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 40;
simple
Nbr Jointure: PAS DE JOINTURE;

******************
*/

 var Table="groupe";
 var CleMaitre = TAB_COMPO_PPTES[37].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var zg_libelle=GetValAt(39);
 if (!ValiderChampsObligatoire(Table,"zg_libelle",TAB_GLOBAL_COMPO[39],zg_libelle,false))
 	return -1;
 if (!ValiderChampsType(Table,"zg_libelle",TAB_GLOBAL_COMPO[39],zg_libelle))
 	return -1;
 var zg_notes=GetValAt(40);
 if (!ValiderChampsObligatoire(Table,"zg_notes",TAB_GLOBAL_COMPO[40],zg_notes,false))
 	return -1;
 if (!ValiderChampsType(Table,"zg_notes",TAB_GLOBAL_COMPO[40],zg_notes))
 	return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",zg_libelle,zg_notes"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+(zg_libelle=="" ? "null" : "'"+ValiderChaine(zg_libelle)+"'" )+","+(zg_notes=="" ? "null" : "'"+ValiderChaine(zg_notes)+"'" )+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
	alert("Echec lors de l'insertion");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Groupe
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Groupe_Liste_des_groupes0(Compo_Maitre)
{
 var Table="groupe";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;

 if (pgsql_update(Req)==0)
	alert("Echec lors de la supression");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Groupe
  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR 
***************************************************/
function User_Update_Groupe_Liste_des_groupes0(Compo_Maitre)
{
 var Table="groupe";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var zg_libelle=GetValAt(39);
 if (!ValiderChampsObligatoire(Table,"zg_libelle",TAB_GLOBAL_COMPO[39],zg_libelle,false))
 	return -1;
 if (!ValiderChampsType(Table,"zg_libelle",TAB_GLOBAL_COMPO[39],zg_libelle))
 	return -1;
 var zg_notes=GetValAt(40);
 if (!ValiderChampsObligatoire(Table,"zg_notes",TAB_GLOBAL_COMPO[40],zg_notes,false))
 	return -1;
 if (!ValiderChampsType(Table,"zg_notes",TAB_GLOBAL_COMPO[40],zg_notes))
 	return -1;
 var Req="update "+Table+" set ";
 Req+="zg_libelle="+(zg_libelle=="" ? "null" : "'"+ValiderChaine(zg_libelle)+"'" )+",zg_notes="+(zg_notes=="" ? "null" : "'"+ValiderChaine(zg_notes)+"'" )+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
	alert("Echec lors de la mise � jour");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Lieu
  TAPEZ ICI LE CODE DE LA REQUETE D'INSERTION
***************************************************/
function User_Insert_Lieu_Liste_des_lieus0(Compo_Maitre)
{

/*
***** INFOS ******

Nbr d'esclaves = 2

Id dans le tab: 27;
simple
Nbr Jointure: PAS DE JOINTURE;

Id dans le tab: 28;
simple
Nbr Jointure: PAS DE JOINTURE;

******************
*/

 var Table="lieu";
 var CleMaitre = TAB_COMPO_PPTES[25].NewCle;
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var zl_libelle=GetValAt(27);
 if (!ValiderChampsObligatoire(Table,"zl_libelle",TAB_GLOBAL_COMPO[27],zl_libelle,false))
 	return -1;
 if (!ValiderChampsType(Table,"zl_libelle",TAB_GLOBAL_COMPO[27],zl_libelle))
 	return -1;
 var zl_notes=GetValAt(28);
 if (!ValiderChampsObligatoire(Table,"zl_notes",TAB_GLOBAL_COMPO[28],zl_notes,false))
 	return -1;
 if (!ValiderChampsType(Table,"zl_notes",TAB_GLOBAL_COMPO[28],zl_notes))
 	return -1;
 var Req="insert into "+Table+" ";
var TabInsertionEnPlus=new Array();
 Req+="("+NomCleMaitre+",zl_libelle,zl_notes"+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[0]:"")+")";
 Req+=" values ("+CleMaitre+","+(zl_libelle=="" ? "null" : "'"+ValiderChaine(zl_libelle)+"'" )+","+(zl_notes=="" ? "null" : "'"+ValiderChaine(zl_notes)+"'" )+""+(TabInsertionEnPlus.length!=0?","+TabInsertionEnPlus[1]:"")+")";

 if (pgsql_update(Req)==0)
	alert("Echec lors de l'insertion");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Lieu
  TAPEZ ICI LE CODE DE LA REQUETE DE SUPPRESSION 
***************************************************/
function User_Delete_Lieu_Liste_des_lieus0(Compo_Maitre)
{
 var Table="lieu";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var Req="delete from "+Table+" where "+NomCleMaitre+" = "+CleMaitre;

 if (pgsql_update(Req)==0)
	alert("Echec lors de la supression");
return CleMaitre;

}
/*************************************************
  REQUETES UTILSATEUR : Onglet : Lieu
  TAPEZ ICI LE CODE DE LA REQUETE DE MISE A JOUR 
***************************************************/
function User_Update_Lieu_Liste_des_lieus0(Compo_Maitre)
{
 var Table="lieu";
 var CleMaitre = Compo_Maitre.getCleVal();
 var NomCleMaitre = DePrefixerChamp(Compo_Maitre.getCle());
 var zl_libelle=GetValAt(27);
 if (!ValiderChampsObligatoire(Table,"zl_libelle",TAB_GLOBAL_COMPO[27],zl_libelle,false))
 	return -1;
 if (!ValiderChampsType(Table,"zl_libelle",TAB_GLOBAL_COMPO[27],zl_libelle))
 	return -1;
 var zl_notes=GetValAt(28);
 if (!ValiderChampsObligatoire(Table,"zl_notes",TAB_GLOBAL_COMPO[28],zl_notes,false))
 	return -1;
 if (!ValiderChampsType(Table,"zl_notes",TAB_GLOBAL_COMPO[28],zl_notes))
 	return -1;
 var Req="update "+Table+" set ";
 Req+="zl_libelle="+(zl_libelle=="" ? "null" : "'"+ValiderChaine(zl_libelle)+"'" )+",zl_notes="+(zl_notes=="" ? "null" : "'"+ValiderChaine(zl_notes)+"'" )+"";
 Req+=" where "+NomCleMaitre+"="+CleMaitre;

 if (pgsql_update(Req)==0)
	alert("Echec lors de la mise � jour");
return CleMaitre;

}

function LstDouble_Exec_Req(CompoSqlListeDessous,CleMaitre_val)
{
    /* cas ou on a 1 seule table de liaison */
    var TabJointure=CompoSqlListeDessous.my_Affichable.my_MaitresLiaison.getJointure().TabJointure;
    if(TabJointure.length!=2)
	{
	    alert("Erreur de programmation:\nLes listes doubles doivent contenir une et une seule table de liaison");
	    throw "Les listes doubles doivent contenir une et une seule table de liaison";
	}

    var CleRel=TabJointure[1].CleDebut;
    var TableRel=TabJointure[0].TableFin;
    var CleMaitre_nom=TabJointure[0].CleFin;
    var ReqRel="select "+CleRel+" from "+TableRel+" where "+CleMaitre_nom+"="+CleMaitre_val;
    var result=pgsql_query(ReqRel);
    var enumerator=result.enumerate();
    var TabCle=CompoSqlListeDessous.getAllCleVal();

    if (result.rowCount==0)
	{
	    /* cas ou la liste �tait vide */
	    var i;
	    for(i=0;i<TabCle.length;i++)
		{
		    var ReqInsert="insert into "+TableRel+" ("+CleMaitre_nom+","+CleRel+") values("+CleMaitre_val+","+TabCle[i]+")";
		    if (pgsql_update(ReqInsert)==0)
			{
			    alert("Echec lors de l'insertion");
			    return;
			}
		}
	}
    else
	{

	    /* ON PARCOURS LE TABLEAU EXISTANT */
	    enumerator.beforeFirst();
	    var encore= true;
	    while(encore)
		{
		    encore = enumerator.next();
		    /* on cherche ce qu'on supprime */
		    var i=0;
		    var trouve=false;
		    while(i<TabCle.length && !trouve)
			{
			    if (TabCle[i]==enumerator.getVariant(0))
				{
				    trouve=true;
				}
			    i++;
			}
		    /* si il n'est pas dans le nouveau tableau on l'efface */
		    if (!trouve)
			{
			    var ReqDel="delete from "+TableRel+" where "+CleMaitre_nom+"="+CleMaitre_val+" and "+CleRel+"="+enumerator.getVariant(0);
			    if (pgsql_update(ReqDel)==0)
				{
				    alert("Echec lors de l'insertion");
				    return;
				}
			}
		}


	    /* ON PARCOURS LE DEUXIEME TABLEAU */
	    var i;
	    for(i=0;i<TabCle.length;i++)
		{
		    /* on cherche ce qu'on insert */
		    enumerator.beforeFirst();
		    var encore= true;
		    var trouve=false;
		    while(encore && !trouve)
			{
			    encore = enumerator.next();
			    if(TabCle[i]==enumerator.getVariant(0))
				trouve=true;
			}
		    /* si on ne l'a pas trouver on l'insert */
		    if (!trouve)
			{
			    var ReqIns="insert into "+TableRel+" ("+CleMaitre_nom+","+CleRel+") values("+CleMaitre_val+","+TabCle[i]+")";
			    if (pgsql_update(ReqIns)==0)
				{
				    alert("Echec lors de l'insertion");
				    return;
				}
			}
		}
	}
}
	function GenererAssociation11(ComposantFinal,CleCompoFinal,CleMaitre,TabOut)
{
	/* on regarde dans quel cas on se trouve (cl� �trang�re: 1 liaison ou asso: 2 liaisons) */
	var TabJointure=ComposantFinal.my_Affichable.my_MaitresLiaison.getJointure().TabJointure;
    if(TabJointure.length>2)
	{
	    alert("Erreur de programmation:\nTrop de liaisons (>2)");
	    throw "Erreur de programmation:\nTrop de liaisons (>2)";
	}
	/* cas de jointure simple */
	if (TabJointure.length==1)
	{
		/* l'enregistrement doit exister */
		var CleEtrangere;
		var TableFinale=ComposantFinal.getTable();
		/* on regarde le sens de la jointure */
		if (TabJointure[0].TableFin==TableFinale)
			CleEtrangere=TabJointure[0].CleFin;
		else
			CleEtrangere=TabJointure[0].CleDebut;

		if (mcd_obligatoire(TableFinale,CleEtrangere))
		{
			TabOut.push(CleEtrangere);
			TabOut.push(CleMaitre);
			return true
		}
	}
	return false;
}
function AjouterAssociation(ComposantFinal,CleCompoFinal,CleMaitre)
{
	/* on regarde dans quel cas on se trouve (cl� �trang�re: 1 liaison ou asso: 2 liaisons) */
	var TabJointure=ComposantFinal.my_Affichable.my_MaitresLiaison.getJointure().TabJointure;
    if(TabJointure.length>2)
	{
	    alert("Erreur de programmation:\nTrop de liaisons (>2)");
	    throw "Erreur de programmation:\nTrop de liaisons (>2)";
	}
	/* cas de jointure simple */
	if (TabJointure.length==1)
	{
		/* l'enregistrement doit exister */
		var CleEtrangere;
		var TableFinale=ComposantFinal.getTable();
		/* on regarde le sens de la jointure */
		if (TabJointure[0].TableFin==TableFinale)
			CleEtrangere=TabJointure[0].CleFin;
		else
			CleEtrangere=TabJointure[0].CleDebut;
		var req="update "+TableFinale+" set "+CleEtrangere+" = "+CleMaitre+" where "+ComposantFinal.getCle()+" = "+CleCompoFinal;
		if (pgsql_update(req)==0)
		{
			alert("Echec lors de la mise � jour");
			return false;
		}
	}
	else
	{
		/* cas de jointure double */
		var TableFinale=ComposantFinal.getTable();
		var CleAsso_TableFinal;
		var CleAsso_TableMaitre;
		var TableAsso=TabJointure[0].TableFin;
		/* on regarde le sens de la jointure */
		if (TabJointure[1].TableFin==TableFinale)
		{
			CleAsso_TableMaitre=TabJointure[0].CleFin;
			CleAsso_TableFinal=TabJointure[1].CleDebut;
		}
		else
		{
			CleAsso_TableFinal=TabJointure[0].CleFin;
			CleAsso_TableMaitre=TabJointure[1].CleDebut;
		}
		var req="insert into "+TableAsso+" ("+CleAsso_TableMaitre+","+CleAsso_TableFinal+") values ("+CleMaitre+","+CleCompoFinal+")";
		if (pgsql_update(req)==0)
		{
			alert("Echec lors de l'insertion");
			return false;
		}
	}
	return true;
}
function SuprimerAssociation(ComposantFinal,CleCompoFinal,CleMaitre)
{
	/* on regarde dans quel cas on se trouve (cl� �trang�re: 1 liaison ou asso: 2 liaisons) */
	var TabJointure=ComposantFinal.my_Affichable.my_MaitresLiaison.getJointure().TabJointure;

	/* on ne g�re que les doubles jointure */
	if (TabJointure.length!=2)
		return false;

	var TableFinale=ComposantFinal.getTable();
	var CleAsso_TableFinal;
	var CleAsso_TableMaitre;
	var TableAsso=TabJointure[0].TableFin;
	/* on regarde le sens de la jointure */
	if (TabJointure[1].TableFin==TableFinale)
	{
		CleAsso_TableMaitre=TabJointure[0].CleFin;
		CleAsso_TableFinal=TabJointure[1].CleDebut;
	}
	else
	{
		CleAsso_TableFinal=TabJointure[0].CleFin;
		CleAsso_TableMaitre=TabJointure[1].CleDebut;
	}
	var req="delete from "+TableAsso+" where ( ("+CleAsso_TableMaitre+" = "+CleMaitre+") AND ("+CleAsso_TableFinal+" = "+CleCompoFinal+") )";
	if (pgsql_update(req)==0)
	{
		alert("Echec lors de l'insertion");
		return false;
	}
}

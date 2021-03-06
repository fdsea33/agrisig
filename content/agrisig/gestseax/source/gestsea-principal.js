function principal_alert(x){
    //    alert(x);
}

function CodeInPrincipal(centre){
    principal_alert("D�but de la construction");
    var AllIt = new clTabInterfaceSimple();
//    principal_alert("D�but de la construction 2");
    /****************************
     * AJOUTS SPECIAUX
     ****************************/

    AllIt.IncludeJs("chrome://agrisig/content/gestseax/gestsea/export.js");
    AllIt.IncludeJs("chrome://agrisig/content/gestseax/gestsea/latex.js");
    AllIt.IncludeJs("chrome://agrisig/content/gestseax/generateur/libIO.js");
    //    AllIt.IncludeJs("chrome://agrisig/content/gestseax/gestsea/gestsea_xul.js");
    AllIt.IncludeJs("chrome://agrisig/content/gestseax/gestsea/gestsea_principal_plus.js");
    AllIt.AjouterMenu("Bordereaux de r�glement...","BordereauPrint","");
    AllIt.AjouterMenu("Imprimer le dernier bordereau","LastBordereauPrint","");

    /****************************
     * AJOUTS DE BASE (Personne, Devis, Facture, Avoir,...)
     ****************************/


    /****************************
     * PERSONNE
     ****************************/
    
    var It_Personne,Maitre_Personne;
    var PersonneContact,PersonneObservation,PersonneCotisation,PersonneResponsabilite,PersonneProduction,PersonneAbonConseil,PersonneAdresse,PersonneVente,PersonneDossier;


    It_Personne = new clInterfaceSimple("Personnes");

    Maitre_Personne = It_Personne.AjouterMaitre("Liste des personnes","personne");

    Maitre_Personne.AjouterColonne("Nom","pe_fullname");
    //    Maitre_Personne.AjouterColonne("Nom","pe_nom");
    //Maitre_Personne.AjouterColonne("Pr�nom","pe_prenom");
    //Maitre_Personne.AjouterColonne("Titre","pe_titre");
    Maitre_Personne.AjouterColonne("N�Pers.","pe_numpersonne");
    Maitre_Personne.AjouterColonne("T�l.","pe_telephone");
    Maitre_Personne.AjouterColonne("Fax","pe_fax");
    Maitre_Personne.AjouterColonne("Canton","ct_nom");
    Maitre_Personne.AjouterColonne("Adresse","pe_adresse");//,new Array("pe_numero","pe_numero","adresse"));
    
    
    
    //    Maitre_Personne.AjouterColonne("Complement","pe_complement");
    /*Ajout de l'adresse en cach�*/
    //    Maitre_Personne.getTheme().AddFiltre('Filtre_PersonneA=new clInterfaceFiltragePermanantCustom("pe_nom=\'AAA\'")');
    //AllIt.AjouterCodeUserLoad('Filtre_PersonneA.setComposant(Compo_'+Maitre_Personne.getNom_()+');\n');



    //    It_Personne.AjouterComposantSimple("N� Adh�rent", "pe_numpersonne",null,null,LABEL);
    It_Personne.AjouterComposantSimple("Titre","pe_titre"); //A normaliser
    It_Personne.AjouterComposantSimple("Nom","pe_nom");
    It_Personne.AjouterComposantSimple("Pr�nom","pe_prenom");
    It_Personne.AjouterComposantSimple("Compl�ment","pe_complement");
    It_Personne.AjouterComposantSimple("Entit� morale","pe_morale",null,null,CHECKBOX);
    It_Personne.AjouterComposantSimple("Date de naissance","pe_naissance");
    It_Personne.AjouterComposantSimple("Etat","ep_libelle",new Array("ep_numero","ep_numero","etatpersonne"),null,LISTE_DEROULANTE);
    It_Personne.AjouterComposantSimple("Type","tp_type",new Array("tp_numero","tp_numero","typepersonne"),null,LISTE_DEROULANTE);
    It_Personne.AjouterComposantSimple("R�gime fiscal","pe_regimefiscal",null,null,LISTE_DEROULANTE_STATIC,null,new Array("FORFAIT","NON RENSEIGNE","REEL"));
    
    //***********************
    //  EST LIE
    /* pour les relations recursives */
    AllIt.AjouterCodeUserLoad('ConstruireOngletEstLie("tabbox_'+Maitre_Personne.getNom_()+'",'+Maitre_Personne.getIdDansTabGlobalCompo()+');\n');
    AllIt.AjouterCodeUserLoad('Compo_'+Maitre_Personne.getNom_()+'.OnChangeUser=RefreshOngletEstLie;\n');
    AllIt.AjouterCodeUserLoad('Compo_'+Maitre_Personne.getNom_()+'.OnChangeUserParams=Compo_'+Maitre_Personne.getNom_()+';\n');

    //***********************
    // ADHESION
    PersonneAdhesion = It_Personne.AjouterComposantComplexe("Adh�sions",new Array("pe_numero","pe_numero","adhesion"));
    //    PersonneAdhesion.AjouterColonne("N�","ah_numero");
    PersonneAdhesion.AjouterColonne("Libell�","ah_libelle",new Array("ah_numero","ah_numero","adherence"));
    PersonneAdhesion.AjouterColonne("Du","po_debut", new Array("po_numero","po_numero","periode"));
    PersonneAdhesion.AjouterColonne("Au","po_fin", new Array("po_numero","po_numero","periode"));
    PersonneAdhesion.AjouterColonne("Active","as_active");

    //***********************
    // OBSERVATION
    PersonneObservation = It_Personne.AjouterComposantComplexe("Observations",new Array("pe_numero","pe_numero","observation"));
    PersonneObservation.AjouterColonne("Importance","ob_niveau");
    PersonneObservation.AjouterColonne("Description","ob_observation");
    
    PersonneObservation.AddMode(INSERTION);
    PersonneObservation.AddMode(SUPPRESSION);
    PersonneObservation.AddMode(MODIFICATION);

    It_Personne.AjouterComposantSimple("Importance","ob_niveau",null,PersonneObservation);
    It_Personne.AjouterComposantSimple("Description","ob_observation",null,PersonneObservation,null,null,null,true);
    

    //***********************
    // ADRESSE
    PersonneAdresse = It_Personne.AjouterComposantComplexe("Adresses", new Array("pe_numero","pe_numero","adresse"));

    PersonneAdresse.AjouterColonne("Uti.","ad_encours");
    PersonneAdresse.AjouterColonne("Type","ad_type");
    PersonneAdresse.AjouterColonne("Ligne n�1","ad_addr1");
    PersonneAdresse.AjouterColonne("Ligne n�2","ad_addr2");
    PersonneAdresse.AjouterColonne("Ligne n�3","ad_addr3");
    PersonneAdresse.AjouterColonne("Code postal","cp_codepostal",new Array("cp_numero","cp_numero","codepostal"));
    PersonneAdresse.AjouterColonne("Ville","vi_nom",new Array("vi_numero","vi_numero","ville"));
    PersonneAdresse.AjouterColonne("Canton","ct_nom",new Array("vi_numero","vi_numero","ville","ct_numero","ct_numero","canton"));

    PersonneAdresse.AddMode(INSERTION);
    PersonneAdresse.AddMode(SUPPRESSION);
    PersonneAdresse.AddMode(MODIFICATION);

    It_Personne.AjouterComposantSimple("Ligne n�1","ad_addr1",null,PersonneAdresse);
    It_Personne.AjouterComposantSimple("Ligne n�2","ad_addr2",null,PersonneAdresse);
    It_Personne.AjouterComposantSimple("Ligne n�3","ad_addr3",null,PersonneAdresse);
    PersonneAdresseActive = It_Personne.AjouterComposantSimple("Adresse en cours","ad_active",null,PersonneAdresse,CHECKBOX);
    It_Personne.AjouterComposantSimple("Date de fin","ad_datestop",null,PersonneAdresse);

    PersonneAdresseType       = It_Personne.AjouterComposantSimple("Type","ad_type",null,PersonneAdresse,LISTE_DEROULANTE_STATIC,null,new Array("DEFAUT","COURRIER","PERSONNELLE","PROFESSIONNELLE"));
    PersonneAdresseCodepostal = It_Personne.AjouterComposantSimple("Code postal", "cp_codepostal", new Array("cp_numero","cp_numero","codepostal"),PersonneAdresse,LISTE_DEROULANTE); 
    PersonneAdresseVille      = It_Personne.AjouterComposantSimple("Ville", "vi_nom", new Array("vi_numero","vi_numero","ville"),PersonneAdresse,LISTE_DEROULANTE);
    
    // event user 
    PersonneAdresse.OnModeInsert=ComposantDansCode(PersonneAdresseType)+'.my_CompoXUL.value="DEFAUT";\n';
    PersonneAdresse.OnModeInsert+=ComposantDansCode(PersonneAdresseActive)+'.my_CompoXUL.value=true;\n';
    PersonneAdresse.OnModeInsert+=ComposantDansCode(PersonneAdresseActive)+'.my_CompoXUL.checked=true;\n';
    
    // Filtre perso (on filtre les Communes par rapport aux CP)
    PersonneAdresseCodepostal.getTheme().AddFiltre('Filtre_CP_Personne=new clInterfaceFiltrageContenuHautBas()');
    // Filtre perso (on filtre les CP par rapport aux Communes)
    PersonneAdresseVille.getTheme().AddFiltre('Filtre_Ville_Personne=new clInterfaceFiltrageContenuHautBas(Filtre_CP_Personne)');
    
    var CodeInit_CP='';
    CodeInit_CP+='var Joint_Filtre_CP_Personne=new clJointureMulti("codepostal",\n';
    CodeInit_CP+='	new Array(\n';
    CodeInit_CP+='		new stJointure("villecp","cp_numero","cp_numero",null,false),\n';
    CodeInit_CP+='		new stJointure("ville","vi_numero","vi_numero",null,false)));\n';
    CodeInit_CP+='Filtre_CP_Personne.setComposant(Compo_'+PersonneAdresseVille.getNom_()+',Joint_Filtre_CP_Personne);\n';
    PersonneAdresseCodepostal.CodeUserOnInit=CodeInit_CP;
    
    var CodeInit_Ville='';
    CodeInit_Ville+='var Joint_Filtre_Ville_Personne=new clJointureMulti("ville",\n';
    CodeInit_Ville+='	new Array(\n';
    CodeInit_Ville+='		new stJointure("villecp","vi_numero","vi_numero",null,false),\n';
    CodeInit_Ville+='		new stJointure("codepostal","cp_numero","cp_numero",null,false)));\n';
    CodeInit_Ville+='Filtre_Ville_Personne.setComposant(Compo_'+PersonneAdresseCodepostal.getNom_()+',Joint_Filtre_Ville_Personne);\n';
    PersonneAdresseVille.CodeUserOnInit=CodeInit_Ville;
    
    
    /*
    It_Adresse.AjouterComposantSimple("Ligne n�1","ad_addr1");
    It_Adresse.AjouterComposantSimple("Ligne n�2","ad_addr2");
    It_Adresse.AjouterComposantSimple("Ligne n�3","ad_addr3");

    TypeAdresse = It_Adresse.AjouterComposantSimple("Type","ad_type",null,null,LISTE_DEROULANTE_STATIC,null,new Array("DEFAUT","COURRIER","PERSONNELLE","PROFESSIONNELLE"));
    
    AdresseCodepostal = It_Adresse.AjouterComposantSimple("Code postal", "cp_codepostal", new Array("cp_numero","cp_numero","codepostal"),null,LISTE_DEROULANTE); 
    AdresseVille      = It_Adresse.AjouterComposantSimple("Ville", "vi_nom", new Array("vi_numero","vi_numero","ville"),null,LISTE_DEROULANTE);

    // event user 
    Maitre_Adresse.OnModeInsert=ComposantDansCode(TypeAdresse)+'.my_CompoXUL.value="DEFAUT";\n';
    
    // Filtre perso (on filtre les Communes par rapport aux CP)
    AdresseCodepostal.getTheme().AddFiltre('Filtre_CP_Personne=new clInterfaceFiltrageContenuHautBas()');
    // Filtre perso (on filtre les CP par rapport aux Communes)
    AdresseVille.getTheme().AddFiltre('Filtre_Ville_Personne=new clInterfaceFiltrageContenuHautBas(Filtre_CP_Personne)');
    
    var CodeInit_CP='';
    CodeInit_CP+='var Joint_Filtre_CP_Personne=new clJointureMulti("codepostal",\n';
    CodeInit_CP+='	new Array(\n';
    CodeInit_CP+='		new stJointure("villecp","cp_numero","cp_numero",null,false),\n';
    CodeInit_CP+='		new stJointure("ville","vi_numero","vi_numero",null,false)));\n';
    CodeInit_CP+='Filtre_CP_Personne.setComposant(Compo_'+AdresseVille.getNom_()+',Joint_Filtre_CP_Personne);\n';
    AdresseCodepostal.CodeUserOnInit=CodeInit_CP;
    
    var CodeInit_Ville='';
    CodeInit_Ville+='var Joint_Filtre_Ville_Personne=new clJointureMulti("ville",\n';
    CodeInit_Ville+='	new Array(\n';
    CodeInit_Ville+='		new stJointure("villecp","vi_numero","vi_numero",null,false),\n';
    CodeInit_Ville+='		new stJointure("codepostal","cp_numero","cp_numero",null,false)));\n';
    CodeInit_Ville+='Filtre_Ville_Personne.setComposant(Compo_'+AdresseCodepostal.getNom_()+',Joint_Filtre_Ville_Personne);\n';
    AdresseVille.CodeUserOnInit=CodeInit_Ville;

    */


    //***********************
    // EST JOIGNABLE
    /*
    PersonneContact = It_Personne.AjouterComposantComplexe("Contacts",new Array("pe_numero","pe_numero","estjoignable","cn_numero","cn_numero","contact")						      );
    PersonneContact.AjouterColonne("Type","cn_type");
    PersonneContact.AjouterColonne("Coordonn�es","cn_coordonnee");
    // Filtre perso
    PersonneContact.getTheme().AddFiltre('Filtre_Contact=new clInterfaceFiltrageEnsXCustom(new Array("Fax","contact.cn_type = \'FAX\'","Tel","contact.cn_type = \'TELEPHONE\'","Portable","contact.cn_type = \'PORTABLE\'"))');
    AllIt.AjouterCodeUserLoad('Filtre_Contact.setComposant(Compo_'+PersonneContact.getNom_()+');\n');
    */
    
    PersonneEstjoignable = It_Personne.AjouterComposantComplexe("Contact",new Array("pe_numero","pe_numero","estjoignable"));
    PersonneEstjoignable.AjouterColonne("Status","ej_etat");
    PersonneEstjoignable.AjouterColonne("Type","cn_type",new Array("cn_numero","cn_numero","contact"));
    PersonneEstjoignable.AjouterColonne("Coordonn�es","cn_coordonnee",new Array("cn_numero","cn_numero","contact"));
    
    //Filtrage OK
    //    PersonneEstjoignable.getTheme().AddFiltre('Filtre_PersonneEstjoignable=new clInterfaceFiltragePermanantCustom("ej_actif=true")');
    // AllIt.AjouterCodeUserLoad('Filtre_PersonneEstjoignable.setComposant(Compo_'+PersonneEstjoignable.getNom_()+');\n');

    // Filtre perso
    /*
    PersonneEstjoignable.getTheme().AddFiltre('Filtre_EstJoignable=new clInterfaceFiltrageEnsXCustom(new Array("Fax","contact.cn_type = \'FAX\'","Tel","contact.cn_type = \'TELEPHONE\'","Portable","contact.cn_type = \'PORTABLE\'"))');
    AllIt.AjouterCodeUserLoad('Filtre_EstJoignable.setComposant(Compo_'+PersonneEstjoignable.getNom_()+');\n');
    */
    
    PersonneEstjoignable.AddMode(INSERTION);
    PersonneEstjoignable.AddMode(SUPPRESSION);
    PersonneEstjoignable.AddMode(MODIFICATION);

    PersonneEstjoignableContact = It_Personne.AjouterComposantSimple("Coordonn�e","cn_coordonnee",new Array("cn_numero","cn_numero","contact"),PersonneEstjoignable,LISTE_DEROULANTE);
    PersonneEstjoignableActif = It_Personne.AjouterComposantSimple("Actif","ej_actif",null,PersonneEstjoignable,CHECKBOX);    
    
    PersonneEstjoignable.OnModeInsert= ComposantDansCode(PersonneEstjoignableActif)+'.my_CompoXUL.value=true;\n';
    PersonneEstjoignable.OnModeInsert+=ComposantDansCode(PersonneEstjoignableActif)+'.my_CompoXUL.checked=true;\n';


    //***********************
    // COMMUNICATIONS
    PersonneCommunication = It_Personne.AjouterComposantComplexe("T�ches",new Array("pe_numero","pe_numero","appel"));
    PersonneCommunication.AjouterColonne("Date","ap_date");
    PersonneCommunication.AjouterColonne("Type","th_libelle",new Array("th_numero","th_numero","typetache"));
    PersonneCommunication.AjouterColonne("Motif","ap_libelle");
    PersonneCommunication.AjouterColonne("Dur�e (min)","ap_duree");
    PersonneCommunication.AjouterColonne("Login","update_user");
    
    PersonneCommunication.AddMode(INSERTION);
    PersonneCommunication.AddMode(SUPPRESSION);
    PersonneCommunication.AddMode(MODIFICATION);

    PersonneCommunicationDate = It_Personne.AjouterComposantSimple("Date","ap_date",null,PersonneCommunication);
    It_Personne.AjouterComposantSimple("Type","th_libelle",new Array("th_numero","th_numero","typetache"),PersonneCommunication,LISTE_DEROULANTE);
    It_Personne.AjouterComposantSimple("Motif","ap_libelle",null,PersonneCommunication);
    It_Personne.AjouterComposantSimple("Dur�e (min)","ap_duree",null,PersonneCommunication);
    It_Personne.AjouterComposantSimple("D�tails compl�mentaires","ap_description",null,PersonneCommunication,null,null,null,true);

    PersonneCommunication.OnModeInsert= 'var ladate=new Date();\n';
    PersonneCommunication.OnModeInsert+='var today=ladate.getDate()+"/"+(ladate.getMonth()+1)+"/"+ladate.getFullYear();\n';
    PersonneCommunication.OnModeInsert+=ComposantDansCode(PersonneCommunicationDate)+'.my_CompoXUL.value=today;\n';


    //***********************
    // RESPONSABILIT�
    var PersonneResponsabilite = It_Personne.AjouterComposantComplexe("Responsabilit�s", new Array("pe_numero","pe_numero","estresponsable"));
    PersonneResponsabilite.AjouterColonne("Status","peac_fini");
    PersonneResponsabilite.AjouterColonne("Nom","re_nom",new Array("re_numero","re_numero","responsabilite"));
    PersonneResponsabilite.AjouterColonne("Famille","re_famille",new Array("re_numero","re_numero","responsabilite"));
    PersonneResponsabilite.AjouterColonne("Code","re_code",new Array("re_numero","re_numero","responsabilite"));
    PersonneResponsabilite.AjouterColonne("Du","peac_periodedebut");
    PersonneResponsabilite.AjouterColonne("Au","peac_periodefin");

    PersonneResponsabilite.AddMode(INSERTION);
    PersonneResponsabilite.AddMode(SUPPRESSION);
    PersonneResponsabilite.AddMode(MODIFICATION);

    It_Personne.AjouterComposantSimple("Responsabilit�","re_nom",new Array("re_numero","re_numero","responsabilite"),PersonneResponsabilite,LISTE_DEROULANTE);
    It_Personne.AjouterComposantSimple("Titre","peac_titre",null,PersonneResponsabilite);
    It_Personne.AjouterComposantSimple("Du","peac_periodedebut",null,PersonneResponsabilite);
    It_Personne.AjouterComposantSimple("Au","peac_periodefin",null,PersonneResponsabilite);
    It_Personne.AjouterComposantSimple("Fin de mandat","peac_fini",null,PersonneResponsabilite,CHECKBOX);

    // Filtre perso sur les responsabilite de l'ann�e en cours
    PersonneResponsabilite.getTheme().AddFiltre('Filtre_PersonneResponsabilite=new clInterfaceFiltrageEnsXCustom(new Array("P�riode en cours","(estresponsable.peac_periodefin is null) or (estresponsable.peac_periodefin>= date(\'01/01/\' || date_part(\'year\',current_date)))"))');
    AllIt.AjouterCodeUserLoad('Filtre_PersonneResponsabilite.setComposant(Compo_'+PersonneResponsabilite.getNom_()+');\n');

    //***********************
    // ATTRIBUTS
    PersonneAttribut = It_Personne.AjouterComposantComplexe("Attributs", new Array("pe_numero","pe_numero","attribut"));
    PersonneAttribut.AjouterColonne("Attribut","ta_nom",new Array("ta_numero","ta_numero","typeattribut"));
    PersonneAttribut.AjouterColonne("Valeur","cr_libelle",new Array("cr_numero","cr_numero","categorie"));
    //    PersonneAttribut.AjouterColonne("D�tail","at_valeur");
    
    PersonneAttribut.AddMode(INSERTION);
    PersonneAttribut.AddMode(SUPPRESSION);
    PersonneAttribut.AddMode(MODIFICATION);

    PersonneAttributTypeattribut = It_Personne.AjouterComposantSimple("Attribut","ta_nom",new Array("ta_numero","ta_numero","typeattribut"),PersonneAttribut,LISTE_DEROULANTE);
    PersonneAttributCategorie    = It_Personne.AjouterComposantSimple("Valeur","cr_libelle",new Array("cr_numero","cr_numero","categorie"),PersonneAttribut,LISTE_DEROULANTE);
    It_Personne.AjouterComposantSimple("D�tail","at_valeur",null,PersonneAttribut,null,null,null,true);    



    // Filtre perso (on filtre les Cat�gories par rapportx au types d'attributs)
    
    PersonneAttributTypeattribut.getTheme().AddFiltre('Filtre_Typeattribut_Personne=new clInterfaceFiltrageContenuHautBas()');

    var CodeInit_TA='';
    CodeInit_TA+='var Joint_Filtre_Typeattribut_Personne=new clJointureMulti("typeattribut",\n';
    CodeInit_TA+='	new Array(\n';
    CodeInit_TA+='		new stJointure("categorie","ta_numero","ta_numero",null,false),\n';
    CodeInit_TA+='		new stJointure("categorie","cr_numero","cr_numero",null,false)));\n';
    CodeInit_TA+='Filtre_Typeattribut_Personne.setComposant(Compo_'+PersonneAttributCategorie.getNom_()+',Joint_Filtre_Typeattribut_Personne);\n';
    PersonneAttributTypeattribut.CodeUserOnInit=CodeInit_TA;
    


    //***********************
    // DEVIS
    PersonneDevis = It_Personne.AjouterComposantComplexe("Devis en cours", new Array("pe_numero","pe_numero","devis"));
    PersonneDevis.AjouterColonne("N�","de_numero");
    PersonneDevis.AjouterColonne("Date","de_date");
    PersonneDevis.AjouterColonne("Libell�","de_libelle");
    PersonneDevis.AjouterColonne("Montant HT","de_montantht");
    PersonneDevis.AjouterColonne("Montant TTC","de_montantttc");

    // Filtre : On montre que les devis modifiables mais ils seront visibles directement � partir de l'onglet
    PersonneDevis.getTheme().AddFiltre('Filtre_PersonneDevis=new clInterfaceFiltragePermanantCustom("de_locked=false")');
    AllIt.AjouterCodeUserLoad('Filtre_PersonneDevis.setComposant(Compo_'+PersonneDevis.getNom_()+');\n');

    //***********************
    // FACTURE
    PersonneFacture = It_Personne.AjouterComposantComplexe("Factures", new Array("pe_numero","pe_numero","facture"));
    PersonneFacture.AjouterColonne("N�","fa_numfact");
    PersonneFacture.AjouterColonne("Date","fa_date");
    PersonneFacture.AjouterColonne("Libell�","fa_libelle");
    PersonneFacture.AjouterColonne("Agent","ag_libelle",new Array("ag_numero","ag_numero","agent"));
    PersonneFacture.AjouterColonne("Montant HT","fa_montantht");
    PersonneFacture.AjouterColonne("Montant TTC","fa_montantttc");

    //***********************
    // REGLEMENT
    PersonneReglement = It_Personne.AjouterComposantComplexe("R�glements", new Array("pe_numero","pe_numero","reglement"));
    PersonneReglement.AjouterColonne("N�","rg_numero");
    PersonneReglement.AjouterColonne("Date","rg_date");
    PersonneReglement.AjouterColonne("Montant","rg_montant");
    PersonneReglement.AjouterColonne("Mode","mr_libelle",new Array("mr_numero","mr_numero","modereglement"));
    //    PersonneReglement.AjouterColonne("Facture","fa_numfact",new Array("fa_numero","fa_numero","facture"));
    PersonneReglement.AjouterColonne("Etat","rg_etat");

    //***********************
    // ROUTAGE
    PersonneRoutage = It_Personne.AjouterComposantComplexe("Routages", new Array("pe_numero","pe_numero","routage"));
    PersonneRoutage.AjouterColonne("D�but","ro_debutservice");
    PersonneRoutage.AjouterColonne("Fin","ro_finservice");
    PersonneRoutage.AjouterColonne("Qt�.","ro_quantite");
    PersonneRoutage.AjouterColonne("Adresse","ad_libelle",new Array("ad_numero","ad_numero","adresse"));
    PersonneRoutage.AjouterColonne("Facture","fa_numfact",new Array("fa_numero","fa_numero","facture"));

    PersonneRoutage.AddMode(SUPPRESSION);
    PersonneRoutage.AddMode(MODIFICATION);

    It_Personne.AjouterComposantSimple("D�but","ro_debutservice",null,PersonneRoutage);
    It_Personne.AjouterComposantSimple("Fin","ro_finservice",null,PersonneRoutage);
    It_Personne.AjouterComposantSimple("Quantit�","ro_quantite",null,PersonneRoutage);
    It_Personne.AjouterComposantSimple("Adresse","ad_libelle",new Array("ad_numero","ad_numero","adresse"),PersonneRoutage,LISTE_DEROULANTE);
    It_Personne.AjouterComposantSimple("Suspendre les relances","ro_suspendu",null,PersonneRoutage,CHECKBOX);

    // Bouton de recherche
    Maitre_Personne.CodeUserOnInit='Compo_'+Maitre_Personne.getNom_()+'.AddCompoAddOn(new clAddon_Fctmenupopup("Rechercher",new Array("Par num�ro","Par nom","Par code postal","Par ville","Par contact"),new Array(Recherche_Num,Recherche_Nom,Recherche_CP,Recherche_Ville,Recherche_Contact),new Array(Compo_'+Maitre_Personne.getNom_()+',Compo_'+Maitre_Personne.getNom_()+',Compo_'+Maitre_Personne.getNom_()+',Compo_'+Maitre_Personne.getNom_()+',Compo_'+Maitre_Personne.getNom_()+')));\n';

    principal_alert("Personnes...OK!");

    /****************************
     * CONTACT
     ****************************/

    var It_Contact, Maitre_Contact;

    It_Contact = new clInterfaceSimple("Contacts");
    
    Maitre_Contact = It_Contact.AjouterMaitre("Liste des contacts","contact");
    Maitre_Contact.AjouterColonne("Type","cn_type");
    Maitre_Contact.AjouterColonne("Coordonn�es","cn_coordonnee");

    //It_Contact.AjouterBouton("Test 1","Test",ComposantDansCode(Maitre_Contact));
    
    ContactType = It_Contact.AjouterComposantSimple("Type","cn_type",null,null,LISTE_DEROULANTE_STATIC,null,new Array("FAX","PORTABLE","TELEPHONE","E-MAIL"));
    It_Contact.AjouterComposantSimple("Coordonn�es","cn_coordonnee");

    Maitre_Contact.OnModeInsert=ComposantDansCode(ContactType)+'.my_CompoXUL.value="TELEPHONE";\n';

    principal_alert("Contacts...OK!");

    /****************************
     * DEVIS
     ****************************/

    var It_Devis, Maitre_Devis;

    It_Devis = new clInterfaceSimple("Devis");

    Maitre_Devis = It_Devis.AjouterMaitre("Liste des devis","devis");
    Maitre_Devis.AjouterColonne("Devis","de_numero");
    Maitre_Devis.AjouterColonne("Date","de_date");
    //    Maitre_Devis.AjouterColonne("Libell�","de_libelle");
    //    Maitre_Devis.AjouterColonne("Client","pe_libelle",new Array("pe_numero","pe_numero","personne"));
    Maitre_Devis.AjouterColonne("Montant TTC","de_montantttc");
 
    //    PersonneEstjoignable.getTheme().AddFiltre('Filtre_PersonneEstjoignable=new clInterfaceFiltragePermanantCustom("ej_actif=true")');
    // AllIt.AjouterCodeUserLoad('Filtre_PersonneEstjoignable.setComposant(Compo_'+PersonneEstjoignable.getNom_()+');\n');
    
    It_Devis.AjouterBouton("Passer le devis en facture","DevisVersFacture",ComposantDansCode(Maitre_Devis));
    It_Devis.AjouterBouton("Imprimer le devis","Imprimer",ComposantDansCode(Maitre_Devis)+",'devis'");

    DevisDate = It_Devis.AjouterComposantSimple("Date","de_date");
    It_Devis.AjouterComposantSimple("Libell�","de_libelle");
    //    It_Devis.AjouterComposantSimple("Suivi par","ag_libelle",new Array("ag_numero","ag_numero","agent"),null,LISTE_DEROULANTE);
    It_Devis.AjouterComposantSimple("Suivi par","em_libelle",new Array("em_numero","em_numero","employe"),null,LISTE_DEROULANTE);
    It_Devis.AjouterComposantSimple("Acompte � payer","de_acompte",null,null,CHECKBOX);
    It_Devis.AjouterComposantSimple("Devis sous forme de lettre","de_lettre",null,null,CHECKBOX);
    DevisCivilites = It_Devis.AjouterComposantSimple("Civilit�s","de_civilites");
    DevisIntroduction = It_Devis.AjouterComposantSimple("Introduction de la lettre","de_introduction",null,null,null,null,null,true);
    
    Maitre_Devis.OnModeInsert='var ladate=new Date();\n';
    Maitre_Devis.OnModeInsert+='var today=ladate.getDate()+"/"+(ladate.getMonth()+1)+"/"+ladate.getFullYear();\n';
    Maitre_Devis.OnModeInsert+=ComposantDansCode(DevisDate)+'.my_CompoXUL.value=today;\n';
    Maitre_Devis.OnModeInsert+=ComposantDansCode(DevisCivilites)+'.my_CompoXUL.value="Ch�re Madame, Cher Monsieur";\n';
    Maitre_Devis.OnModeInsert+=ComposantDansCode(DevisIntroduction)+'.my_CompoXUL.value="Suite � notre conversation, je vous communique les �l�ments du devis concernant mon intervention sur le dossier de ";\n';

    DevisLigne = It_Devis.AjouterComposantComplexe("Lignes du devis",new Array("de_numero","de_numero","ligne"));
    DevisLigne.AjouterColonne("Produit","pd_libelle",new Array("pd_numero","pd_numero","produit"));
    DevisLigne.AjouterColonne("Qt�.","l_quantite");
    DevisLigne.AjouterColonne("Montant HT","l_montantht");
    DevisLigne.AjouterColonne("Montant TTC","l_montantttc");

    DevisLigne.AddMode(INSERTION);
    DevisLigne.AddMode(SUPPRESSION);
    DevisLigne.AddMode(MODIFICATION);

    DevisLigneProduit = It_Devis.AjouterComposantSimple("Produit","pd_libelle",new Array("pd_numero","pd_numero","produit"),DevisLigne,LISTE_DEROULANTE);
    DevisLigneProduit.getTheme().AddFiltre('Filtre_DevisLigneProduit=new clInterfaceFiltragePermanantCustom("pd_actif=true")');
    AllIt.AjouterCodeUserLoad('Filtre_DevisLigneProduit.setComposant(Compo_'+DevisLigneProduit.getNom_()+');\n');

    DevisLigneQuantite=It_Devis.AjouterComposantSimple("Quantit�.","l_quantite",null,DevisLigne);
    DevisLigne.OnModeInsert=ComposantDansCode(DevisLigneQuantite)+'.my_CompoXUL.value=1;\n';

    It_Devis.AjouterComposantSimple("Notes","l_notes",null,DevisLigne,null,null,null,true);

    principal_alert("Devis...OK!");

    
    /****************************
     * FACTURE
     ****************************/

    var It_Facture, Maitre_Facture;

    It_Facture = new clInterfaceSimple("Facture");


    Maitre_Facture = It_Facture.AjouterMaitre("Liste des factures","facture");
    Maitre_Facture.AjouterColonne("N� Fact.","fa_numfact");
    Maitre_Facture.AjouterColonne("N� Devis","de_numero");
    Maitre_Facture.AjouterColonne("Date","fa_date");
    //Maitre_Facture.AjouterColonne("Client","pe_libelle",new Array("pe_numero","pe_numero","personne"));
    Maitre_Facture.AjouterColonne("Agent","ag_initiales",new Array("ag_numero","ag_numero","agent"));
    Maitre_Facture.AjouterColonne("Montant TTC","fa_montantttc");

    It_Facture.AjouterBouton("Passer la facture en avoir","FactureVersAvoir",ComposantDansCode(Maitre_Facture));
    It_Facture.AjouterBouton("Imprimer la facture","Imprimer",ComposantDansCode(Maitre_Facture)+",'facture'");
    It_Facture.AjouterBouton("Joindre un groupe de routage...","GroupeRoutage",ComposantDansCode(Maitre_Facture));
    It_Facture.AjouterBouton("Supprimer le routage du groupe...","SupprimeRoutage",ComposantDansCode(Maitre_Facture));

    It_Facture.AjouterComposantSimple("N� Facture","fa_numfact",null,null,LABEL);
    It_Facture.AjouterComposantSimple("Date","fa_date",null,null,LABEL);
    It_Facture.AjouterComposantSimple("Libell�","fa_libelle",null,null,LABEL);
    //    FacturePersonne = It_Facture.AjouterComposantSimple("Client","pe_libelle",new Array("pe_numero","pe_numero","personne"),null,LISTE_DEROULANTE);
    //    It_Facture.AjouterComposantSimple("Accompte","fa_montantht");
    It_Facture.AjouterComposantSimple("R�duction","fa_reduction",null,null,LABEL);
    It_Facture.AjouterComposantSimple("Montant HT","fa_montantht",null,null,LABEL);
    It_Facture.AjouterComposantSimple("Montant TTC","fa_montantttc",null,null,LABEL);
    It_Facture.AjouterComposantSimple("Annotation","fa_annotation");
    
    //***********************
    // LIGNEFACTURE
    FactureLigne = It_Facture.AjouterComposantComplexe("Lignes de la facture",new Array("fa_numero","fa_numero","lignefacture"));
    FactureLigne.AjouterColonne("Produit","pd_libelle",new Array("pd_numero","pd_numero","produit"));
    FactureLigne.AjouterColonne("Qt�.","lf_quantite");
    FactureLigne.AjouterColonne("Montant HT","lf_montantht");
    FactureLigne.AjouterColonne("Montant TTC","lf_montantttc");

    //***********************
    // AVOIRS
    FactureAvoir = It_Facture.AjouterComposantComplexe("Avoirs de la facture", new Array("fa_numero","fa_numero","avoir"));
    FactureAvoir.AjouterColonne("Date","av_date");
    FactureAvoir.AjouterColonne("Montant","av_montantttc");
 
    //***********************
    // FACTUREREGLEMENT
    FactureFacturereglement = It_Facture.AjouterComposantComplexe("R�glements",new Array("fa_numero","fa_numero","facturereglement"));
    FactureFacturereglement.AjouterColonne("N�","rg_numero");
    FactureFacturereglement.AjouterColonne("Date","rg_date",new Array("rg_numero","rg_numero","reglement"));
    FactureFacturereglement.AjouterColonne("Montant","rg_montant",new Array("rg_numero","rg_numero","reglement"));
    FactureFacturereglement.AjouterColonne("Mode","rg_mode",new Array("rg_numero","rg_numero","reglement"));
    FactureFacturereglement.AjouterColonne("Etat","rg_etat",new Array("rg_numero","rg_numero","reglement"));
    //    It_Facture.AjouterBouton("Valider le r�glement","ValideReglement",ComposantDansCode(FactureFacturereglement));
   
    FactureFacturereglement.AddMode(INSERTION);
    FactureFacturereglement.AddMode(SUPPRESSION);
    FactureFacturereglement.AddMode(MODIFICATION);

    FactureFacturereglementReglement = It_Facture.AjouterComposantSimple("R�glement","rg_libelle", new Array("rg_numero","rg_numero","reglement"),FactureFacturereglement,LISTE_DEROULANTE);
    It_Facture.AjouterComposantSimple("Ce r�glement est un acompte","fr_acompte",null,FactureFacturereglement,CHECKBOX);
    It_Facture.AjouterComposantSimple("Une part du montant du r�glement est utilis�","fr_partiel",null,FactureFacturereglement,CHECKBOX);
    It_Facture.AjouterComposantSimple("Montant de la part","fr_montant",null,FactureFacturereglement);


    //***********************
    // ROUTAGE
    FactureRoutage = It_Facture.AjouterComposantComplexe("Routages", new Array("fa_numero","fa_numero","routage"));
    FactureRoutage.AjouterColonne("D�but","ro_debutservice");
    FactureRoutage.AjouterColonne("Fin","ro_finservice");
    FactureRoutage.AjouterColonne("Qt�.","ro_quantite");
    FactureRoutage.AjouterColonne("Personne","pe_libelle",new Array("pe_numero","pe_numero","personne"));

    FactureRoutage.AddMode(INSERTION);
    FactureRoutage.AddMode(SUPPRESSION);
    FactureRoutage.AddMode(MODIFICATION);
    
    It_Facture.AjouterComposantSimple("Personne","pe_fullname",new Array("pe_numero","pe_numero","personne"),FactureRoutage, LISTE_DEROULANTE);
    It_Facture.AjouterComposantSimple("D�but","ro_debutservice",null,FactureRoutage);
    It_Facture.AjouterComposantSimple("Fin","ro_finservice",null,FactureRoutage);
    It_Facture.AjouterComposantSimple("Quantit�","ro_quantite",null,FactureRoutage);
    
    principal_alert("Facture...OK!");


    
    /****************************
     * AVOIR
     ****************************/
    
    var It_Avoir, Maitre_Avoir;

    It_Avoir = new clInterfaceSimple("Avoir");

    Maitre_Avoir = It_Avoir.AjouterMaitre("Liste des avoirs","avoir");
    Maitre_Avoir.AjouterColonne("N� Facture","av_numfact");
    Maitre_Avoir.AjouterColonne("Date","av_date");
    Maitre_Avoir.AjouterColonne("Montant TTC","av_montantttc");

    It_Avoir.AjouterBouton("Mettre � jour les adh�sions","MiseAJourAdhesion","");
   
    It_Avoir.AjouterBouton("Imprimer l'avoir","Imprimer",ComposantDansCode(Maitre_Avoir)+",'avoir'");
    
    It_Avoir.AjouterComposantSimple("N� Facture","av_numfact",null,null,LABEL);
    It_Avoir.AjouterComposantSimple("Date","av_date");
    //    It_Avoir.AjouterComposantSimple("R�duction","av_reduction",null,null,LABEL);
    It_Avoir.AjouterComposantSimple("Montant TTC","av_montantttc",null,null,LABEL);
    It_Avoir.AjouterComposantSimple("Montant HT","av_montantht",null,null,LABEL);
    
    AvoirLigne = It_Avoir.AjouterComposantComplexe("Lignes de l'avoir",new Array("av_numero","av_numero","ligneavoir"));
    AvoirLigne.AjouterColonne("Produit","pd_libelle",new Array("pd_numero","pd_numero","produit"));
    AvoirLigne.AjouterColonne("Qt�.","la_quantite");
    AvoirLigne.AjouterColonne("Montant HT","la_montantht");
    AvoirLigne.AjouterColonne("Montant TTC","la_montantttc");

    principal_alert("Avoir...OK!");



    /****************************
     * REGLEMENT
     ****************************/
    
    var It_Reglement, Maitre_Reglement;

    It_Reglement = new clInterfaceSimple("R�glement");

    Maitre_Reglement = It_Reglement.AjouterMaitre("Liste des r�glements","reglement");
    Maitre_Reglement.AjouterColonne("N�","rg_numero");
    Maitre_Reglement.AjouterColonne("Etat","rg_etat");
    Maitre_Reglement.AjouterColonne("Date","rg_date");
    Maitre_Reglement.AjouterColonne("Montant","rg_montant");
    Maitre_Reglement.AjouterColonne("Mode","mr_libelle",new Array("mr_numero","mr_numero","modereglement"));

    //    It_Reglement.AjouterBouton("Passer le devis en facture","DevisVersFacture",ComposantDansCode(Maitre_Devis));
    It_Reglement.AjouterBouton("Valider le r�glement","ValideReglement",ComposantDansCode(Maitre_Reglement));

   //    It_Reglement.AjouterComposantSimple("N� Facture (Si le r�glement correspond)","fa_numfact",new Array("fa_numero","fa_numero","facture"),null,LISTE_DEROULANTE);
    It_Reglement.AjouterComposantSimple("Date","rg_date");
    It_Reglement.AjouterComposantSimple("Montant","rg_montant");
    ReglementModereglement = It_Reglement.AjouterComposantSimple("Mode de paiement","mr_libelle",new Array("mr_numero","mr_numero","modereglement"),null,LISTE_DEROULANTE);
    It_Reglement.AjouterComposantSimple("Libell� de la banque","rg_libellebanque");
    It_Reglement.AjouterComposantSimple("N� compte","rg_numerocompte");
    It_Reglement.AjouterComposantSimple("R�f�rence","rg_reference");

    //    ReglementModereglement.getTheme().AddFiltre('Filtre_ReglementModereglement=new clInterfaceFiltragePermanantCustom("mr_actif=true")');
    //    AllIt.AjouterCodeUserLoad('Filtre_ReglementModereglement.setComposant(Compo_'+ReglementModereglement.getNom_()+');\n');

    //*********************
    // FACTUREREGLEMENT
    ReglementFacturereglement = It_Reglement.AjouterComposantComplexe("Factures concern�es", new Array("rg_numero","rg_numero","facturereglement"));
    ReglementFacturereglement.AjouterColonne("N� Fact.","fa_numfact",new Array("fa_numero","fa_numero","facture"));
    ReglementFacturereglement.AjouterColonne("Date","fa_date",new Array("fa_numero","fa_numero","facture"));
    ReglementFacturereglement.AjouterColonne("Type","fr_type");
    ReglementFacturereglement.AjouterColonne("Montant","fr_montant");
    
    ReglementFacturereglement.AddMode(INSERTION);
    ReglementFacturereglement.AddMode(SUPPRESSION);
    ReglementFacturereglement.AddMode(MODIFICATION);
        
    It_Reglement.AjouterComposantSimple("Facture","fa_numfact",new Array("fa_numero","fa_numero","facture"),ReglementFacturereglement,LISTE_DEROULANTE);
    It_Reglement.AjouterComposantSimple("Acompte","fr_acompte",null,ReglementFacturereglement,CHECKBOX);
    It_Reglement.AjouterComposantSimple("La facture re�oit seulement une part du r�glement","fr_partiel",null,ReglementFacturereglement,CHECKBOX);
    It_Reglement.AjouterComposantSimple("Montant de la part","fr_montant",null,ReglementFacturereglement);


    //*********************
    // REPARTITION
    ReglementRepartition = It_Reglement.AjouterComposantComplexe("Dont reversements...", new Array("rg_numero","rg_numero","repartition"));
    ReglementRepartition.AjouterColonne("Montant","rp_montant");
    ReglementRepartition.AjouterColonne("Vers","mp_libelle",new Array("mp_numero","mp_numero","moderepartition"));

    ReglementRepartition.AddMode(INSERTION);
    ReglementRepartition.AddMode(SUPPRESSION);
    ReglementRepartition.AddMode(MODIFICATION);
    
    It_Reglement.AjouterComposantSimple("Montant","rp_montant",null,ReglementRepartition);
    It_Reglement.AjouterComposantSimple("Vers","mp_libelle",new Array("mp_numero","mp_numero","moderepartition"),ReglementRepartition,LISTE_DEROULANTE);

    principal_alert("Reglement...OK!");



    
    /****************************
     * ROUTAGE
     ****************************/

    var It_Routage, Maitre_Routage;

    It_Routage = new clInterfaceSimple("Routage");

    It_Routage.AjouterBouton("Changer le num�ro du journal...","ChangerNumeroJournal","");

    Maitre_Routage = It_Routage.AjouterMaitre("Liste des routages","current_routage");
    Maitre_Routage.AjouterColonne("N�Journal","rc_numero");
    Maitre_Routage.AjouterColonne("N�Client","rc_ncli");
    Maitre_Routage.AjouterColonne("Titre","rc_titr");
    Maitre_Routage.AjouterColonne("Nom","rc_nomp");
    Maitre_Routage.AjouterColonne("Comp.","rc_cide");
    Maitre_Routage.AjouterColonne("Ligne 1","rc_ad1");
    Maitre_Routage.AjouterColonne("Ligne 2","rc_ad2");
    Maitre_Routage.AjouterColonne("C.P.","rc_cpos");
    Maitre_Routage.AjouterColonne("Ville","rc_burd");
    Maitre_Routage.AjouterColonne("Nb. Ex.","rc_nbex");


    principal_alert("Routage...OK!");

    /****************************
     * RELANCE JOURNAL
     ****************************/

    var It_RelanceJournal, Maitre_RelanceJournal;

    It_RelanceJournal = new clInterfaceSimple("Relances");

    It_RelanceJournal.AjouterBouton("Nombre de num�ros pass�s","ChangerNombrePasses","");
    It_RelanceJournal.AjouterBouton("Nombre de num�ros futurs","ChangerNombreFuturs","");

    Maitre_RelanceJournal = It_RelanceJournal.AjouterMaitre("Liste des relances","current_relance");
    Maitre_RelanceJournal.AjouterColonne("Niveau","rl_niveau");
    Maitre_RelanceJournal.AjouterColonne("Dernier N�","rl_derniernumero");
    Maitre_RelanceJournal.AjouterColonne("N�Client","pe_numero");
    Maitre_RelanceJournal.AjouterColonne("Titre","pe_titre");
    Maitre_RelanceJournal.AjouterColonne("Nom","pe_nom");
    Maitre_RelanceJournal.AjouterColonne("Pr�nom","pe_prenom");
    Maitre_RelanceJournal.AjouterColonne("Comp.","pe_complement");
    Maitre_RelanceJournal.AjouterColonne("Ligne 1","ad_addr1");
    Maitre_RelanceJournal.AjouterColonne("Ligne 2","ad_addr2");
    Maitre_RelanceJournal.AjouterColonne("Ligne 3","ad_addr2");
    Maitre_RelanceJournal.AjouterColonne("C.P.","cp_codepostal");
    Maitre_RelanceJournal.AjouterColonne("Ville","vi_nom");

    principal_alert("RelanceJournal...OK!");

    /****************************
     * Personne Update
     ****************************/

    var It_Personneupdate, Maitre_Personneupdate;

    It_Personneupdate = new clInterfaceSimple("V�rification");

    Maitre_Personneupdate = It_Personneupdate.AjouterMaitre("Liste des modifications sur les personnes","personneupdate");
    Maitre_Personneupdate.AjouterColonne("Date","pu_date");
    Maitre_Personneupdate.AjouterColonne("Login","update_user");
    Maitre_Personneupdate.AjouterColonne("N�","pe_numpersonne");
    Maitre_Personneupdate.AjouterColonne("Nom","pe_libelle");
    Maitre_Personneupdate.AjouterColonne("Action","pu_action");
    Maitre_Personneupdate.AjouterColonne("Bilan","pu_bilan");

    It_Personneupdate.AjouterBouton("Vider la liste","ViderPersonneUpdate","");
    
    It_Personneupdate.AjouterComposantSimple("Action","pu_action",null,null,LABEL);
    It_Personneupdate.AjouterComposantSimple("Bilan","pu_bilan",null,null,null,null,null,true);
    It_Personneupdate.AjouterComposantSimple("Titre (Avant)","pe_titre");
    It_Personneupdate.AjouterComposantSimple("Titre (Actuellement)","pe_titre",new Array("pe_numero","pe_numero","personne"));
    It_Personneupdate.AjouterComposantSimple("Nom (Avant)","pe_nom");
    It_Personneupdate.AjouterComposantSimple("Nom (Actuellement)","pe_nom",new Array("pe_numero","pe_numero","personne"));
    It_Personneupdate.AjouterComposantSimple("Pr�nom (Avant)","pe_prenom");
    It_Personneupdate.AjouterComposantSimple("Pr�nom (Actuellement)","pe_prenom",new Array("pe_numero","pe_numero","personne"));
    It_Personneupdate.AjouterComposantSimple("R�gime fiscal (Avant)","pe_regimefiscal",null,null,LISTE_DEROULANTE_STATIC,null,new Array("FORFAIT","NON RENSEIGNE","REEL"));
    It_Personneupdate.AjouterComposantSimple("R�gime fiscal (Actuellement)","pe_regimefiscal",new Array("pe_numero","pe_numero","personne"),null,LISTE_DEROULANTE_STATIC,null,new Array("FORFAIT","NON RENSEIGNE","REEL"));
    It_Personneupdate.AjouterComposantSimple("Naissance (Avant)","pe_naissance");
    It_Personneupdate.AjouterComposantSimple("Naissance (Actuellement)","pe_naissance",new Array("pe_numero","pe_numero","personne"));
    It_Personneupdate.AjouterComposantSimple("Entit� morale (Avant)","pe_morale",null,null,CHECKBOX);
    It_Personneupdate.AjouterComposantSimple("Entit� morale (Actuellement)","pe_naissance",new Array("pe_numero","pe_numero","personne"),null,CHECKBOX);

    principal_alert("Personneupdate...OK!");


    
    // Liaisons
    It_Avoir.LierA(FactureAvoir,It_Facture);
    It_Contact.LierA(PersonneEstjoignableContact,It_Personne);
    It_Devis.LierFortementA(PersonneDevis,It_Personne);
    //    It_Facture.LierA(RoutageFacture,It_Routage);
    It_Facture.LierFortementA(PersonneFacture,It_Personne);
    //    It_Personne.LierA(DevisPersonne,It_Devis);
    //It_Personne.LierA(FacturePersonne,It_Facture);
    //    It_Personne.LierA(RoutagePersonne,It_Routage);
    It_Reglement.LierA(FactureFacturereglementReglement, It_Facture);
    It_Reglement.LierFortementA(PersonneReglement,It_Personne);
    
    /****************************************/
    /*      EVALUATION DE CONSTRUCTION      */
    /****************************************/
    /*                                      */
    eval(centre);
    /*                                      */
    /****************************************/

    // Ajouts d'interfaces
    AllIt.AjouterInterface(It_Personne);
    AllIt.AjouterInterface(It_Contact);
    AllIt.AjouterInterface(It_Devis);
    AllIt.AjouterInterface(It_Facture);
    AllIt.AjouterInterface(It_Avoir);
    AllIt.AjouterInterface(It_Reglement);
    AllIt.AjouterInterface(It_Routage);
    AllIt.AjouterInterface(It_RelanceJournal);
    AllIt.AjouterInterface(It_Personneupdate);

    principal_alert("G�n�ration termin�e");
    AllIt.GenererInterface("gestsea_principal",null,"GestSEA Principal",true);
}

//alert("GG Charg�");

'use strict';

// Declare app level module which depends on views, and components
angular.module('TaskOverflowApp', [
  'ngRoute',
  'ngResource',
  'pascalprecht.translate',
  'TaskOverflowApp.question',
  'TaskOverflowApp.tag',
  'TaskOverflowApp.badge',
  'TaskOverflowApp.user',
  'TaskOverflowApp.session',
  'TaskOverflowApp.error',
  'TaskOverflowApp.utils',
  'TaskOverflowApp.version'
])

.run(function ($rootScope) {
    $rootScope.SERVER_URL="http://localhost:8080/";
    $rootScope.CONF_SERVER_URL="http://localhost:666/";
    $rootScope.FEATURES={};
    $rootScope.HEALTHCHECK={};
})

.config(
    ['$locationProvider', '$routeProvider', '$translateProvider', '$resourceProvider', '$httpProvider', function($locationProvider, $routeProvider, $translateProvider, $resourceProvider, $httpProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider
            .when("/", {
              templateUrl: 'question/question.html',
              controller: 'QuestionCtrl'
            })
            //.otherwise({redirectTo: '/error'})
            ;

        $locationProvider.html5Mode({
          enabled: true,
          requireBase: false
        });

        $translateProvider.translations('en', {
        default_paginate_prev: 'Previous',
        default_paginate_next: 'Next',

        springSecurity_login_username_label: 'Username',
        springSecurity_login_password_label: 'Password',
        springSecurity_login_header: 'Login',
        springSecurity_login_remember_me_label: 'Remember me',
                springSecurity_login_button: 'Send',
        home_welcome: 'Welcome to TaskOverflow',
        home_presentation: 'Congratulations, you have successfully accessed to the magic TaskOverflow website! At the moment this is a wonderful page, feel free to like it or redirect yourself to an other place or share whatever content with your friends. Below is a list of links to ask some interesting questions.',
        home_nav_questions: 'Questions',
        home_nav_tags: 'Tags',
        home_nav_badges: 'Badges',
        home_nav_users: 'Users',
        home_nav_login: 'Login',
        home_nav_logout: 'Logout',
        home_nav_signin: 'Sign in',
        home_nav_profile: 'My profile',
        home_nav_ask: 'Ask a question',
        home_badge_owners: 'Owners:',
        other_none: 'none',
        other_unknown: 'unknown',
        other_firstname: 'Firstname',
        other_lastname: 'Lastname',
        other_email: 'Email',
        other_reputation: 'Reputation',
        other_mysuccess: 'My success',
        other_myquestions: 'My questions',
        other_mymessages: 'My messages',
        other_back: 'Back',
        other_new: 'New',
                other_send: 'Send',
                other_edit: 'Edit',
        message_solved: 'Solved',
        message_author: 'Author',
        message_value: 'Value',
        message_question: 'Question',
            message_date: 'Date',
            message_tags: 'Tags',
        message_addcom: 'Add a comment',
        message_content: 'Content',
        message_answer: 'Answer',
        message_ban: 'Ban',
        message_unban: 'Unban',
        badges_superman_desc: 'Get 100 points from gamification.',
        badges_hercule_desc: 'Get 50 points from gamification.',
        badges_nbone_desc: 'Write your first message.',
        stupid_question: 'Do you like cats?',
        user_username_label: 'Username',
        user_password_label: 'Password',

        myMessage_content_label: 'Content',
        answerMessage_content_label: 'Content',
        questionMessage_content_label: 'Content',

        profile_firstname_label: 'Firstname',
        profile_lastname_label: 'Lastname',
        profile_email_label: 'Email',
        profile_image_label: 'Image',

        question_title_label: 'Title',

        access_forbidden: 'Access forbidden.'
        });
        $translateProvider.translations('fr', {
        default_paginate_prev: 'Précédent',
        default_paginate_next: 'Suivant',

        springSecurity_login_username_label: 'Pseudo',
        springSecurity_login_password_label: 'Mot de passe',
        springSecurity_login_header: 'Connexion',
        springSecurity_login_remember_me_label: 'Se souvenir',
                springSecurity_login_button: 'Valider',

        home_welcome: 'Bienvenue sur TaskOverflow',
        home_presentation: 'Félicitations, vous avez réussi à accéder au site Web magique TaskOverflow ! En ce moment c\'est une page merveilleuse, n\'hésitez pas à l\'aimer ou à vous rediriger vers un autre endroit ou partager son contenu avec vos amis. Voici une liste de liens pour poser des questions intéressantes.',
        home_nav_questions: 'Questions',
        home_nav_tags: 'Tags',
        home_nav_badges: 'Badges',
        home_nav_users: 'Utilisateurs',
        home_nav_login: 'Connexion',
        home_nav_logout: 'Déconnexion',
        home_nav_signin: 'Inscription',
        home_nav_profile: 'Mon profil',
        home_nav_ask: 'Poser une question',
        home_badge_owners: 'Propriétaires :',
        other_none: 'aucun',
        other_unknown: 'inconnu',
        other_firstname: 'Prénom',
        other_lastname: 'Nom',
        other_email: 'Email',
        other_mysuccess: 'Mes succès',
        other_myquestions: 'Mes questions',
        other_mymessages: 'Mes messages',
        other_reputation: 'Réputation',
        other_back: 'Retour',
        other_new: 'Nouveau',
                other_send: 'Envoyer',
                other_edit: 'Editer',
        message_solved: 'Résolu',
        message_author: 'Auteur',
        message_value: 'Valeur',
        message_question: 'Question',
        message_date: 'Date',
        message_addcom: 'Ajouter un commentaire',
        message_content: 'Contenu',
        message_answer: 'Réponse',
            message_ban: 'Bannir',
            message_tags: 'Tags',
        message_unban: 'Débannir',
        badges_superman_desc: 'Obtenez 100 points de la gamification.',
        badges_hercule_desc: 'Obtenez 50 points de la gamification.',
        badges_nbone_desc: 'Ecrivez votre premier message.',

        user_username_label: 'Pseudo',
        user_password_label: 'Mot de passe',

        myMessage_content_label: 'Contenu',
        answerMessage_content_label: 'Contenu',
        questionMessage_content_label: 'Contenu',
        stupid_question: 'Aimez-vous les chats?',
        profile_firstname_label: 'Prénom',
        profile_lastname_label: 'Nom',
        profile_email_label: 'Email',
        profile_image_label: 'Image',

        question_title_label: 'Titre',

        access_forbidden: 'Accès interdit.'
        });
        $translateProvider.preferredLanguage('en');
    }]
)

.filter('reverse', function() {
    return function(items) {
            return items? items.slice().reverse() : [];
    };
})

.filter('capitalize', function() {
    return function(input, scope) {
            if (input!=null)
                    input = input.toLowerCase();
            return input.substring(0,1).toUpperCase()+input.substring(1);
    }
})
;

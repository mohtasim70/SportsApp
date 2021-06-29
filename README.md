# SportsApp
 
“PriSports” is the famous sports club of the town which offers variety of sports facilities to the athletes. Prisports offers coaching for various two players games such as table tennis, Tennis, Bed Minton and squash with multiple game courts for each game type. Here is the detail of employees of the club and game courts that club owns. 5 Admins will manage players, Coach, and they can generate schedule for game practice session(s) and matches 20 Game coaches will be assisting the game sessions and matches. Each game coach is capable to assist all types of games. Sr. Game Courts Court Name 1 Tennis 10 TenC1, TenC2,TenC3,TenC4…TenC10 2 Badminton 08 BDM1,BDM2,BDM3…BDM8 3 Table tennis 20 TT1,TT2,TT3….TT20 4 Squash 06 Sq1,Sq2…Sq8

Feature No Description

R1- Player Registration A new user will register for club membership. On the registration form, User shall have to select game(s) in which he/she is interested to play. In addition, User have to select his/her one ranking against each game such as is he a beginner or Medium or advance level player. Upon, successful registration, User will be registered as a player.

R2- Player Dashboard On First time login, Dashboard will prompt player to add some more choices about games such as a. Player will have to specify his daily/Weekly timings to join the club. b. Player will have to select the ranking level of his opponent player such as is he interested to play with beginner, medium or advance level player. c. Keep in mind that unauthorize access should not be granted and appropriate messages should be displayed if someone try to do so.

R3 Once User will come into club with proper authentication and authorize access, then he will have to mark his attendance to let system know that he is available in club now. Player will choose the games and priority of each game. For example, he will play badminton first for 30 mins and then play tennis for next 30 mins. System will also record his check-in time on marking attendance.

R4 Once marking attendance, player will be able see his schedule for each game session. In practice session schedule, Player will be able to see below information:  Game court – Where he will have to play the game.  Game Coach – Club Employee who will be monitoring and assisting the players and game  Game Timings – When game will be starting and ending and duration of each game.  Game opponent player.

R5 a. On Dashboard, Player will also be able to view his progress/ranking in each Practice session. This ranking/progress will be added by the Coach such as in how many practice sessions player has attended and duration of each practice session.

b. On Dashboard, Player will also be able to view results of the Match/Competitions in which players have participated. These results will be added by the Coach later on.

On Dashboard, Player can show his interest to play a match with some other opponent of his choice. If player don’t choose any opponent, system will allocate an opponent who is also interested in the match. Once marking attendance, player will be able see his schedule for each game session. In practice session schedule, Player will be able to see below information:  Match court – Where he will have to play the game.  Match Coach – Club Employee who will be monitoring and assisting the players and game  Match Timings – When game will be starting and ending and duration of each game.  Match Opponent

R7- Game Coach Game Coach will assist and monitor practice sessions assigned to him by the club. Coach will add the ranking of players after game session.

R8 Game Coach will assist and monitor Matches assigned to him by the club. Coach will add the ranking of players after game session.

R9 – Club Admin Club admin shall manage (perform CRUD on) players and game coaches R10 When a player will mark his attendance, Admin will get a notification and generate a schedule for his practice session. If no player is available, then system will assign a club coach to play against him in practice session. When a player shows his interest to play a match, Admin will get a notification and generate a schedule for his match. If no player is available, then system will assign a club coach to play a match against him.

How to start: First seed data pf Games and Courts.

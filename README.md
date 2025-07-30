<h1>HammerTime <a title="Crowdin" target="_blank" href="https://crowdin.com/project/hammertime"><img src="https://badges.crowdin.net/hammertime/localized.svg" alt=""></a></h1>

I discovered [DiscordTimeStamper] through [this Reddit post] and immediately knew this could be turned into a website,
so here it is.

[discordtimestamper]: https://github.com/TimeTravelPenguin/DiscordTimeStamper/
[this reddit post]: https://www.reddit.com/r/discordapp/comments/oiv86b/i_made_a_tool_to_make_timestamps_for_discord/

This project is not affiliated with Discord in any way shape or form.

Application logo based on [Hammer] by John Caserta, from The Noun Project licensed under [CC BY 3.0 Unported]

[hammer]: https://meta.m.wikimedia.org/wiki/File:Hammer_-_Noun_project_1306.svg
[cc by 3.0 unported]: https://creativecommons.org/licenses/by/3.0/deed.en

## Translation

New language contributions are welcome! They are handled through [Crowdin]. If you don't see your language listed,
[join our Discord server] and ask for your language to be added to the project in the [#translator-signup] channel. You
will be given the Translator role and granted access to a language-specific channel for further discussion. This is
necessary so that when new translations are needed for any potential new site features, I have an easy way to reach
everyone at once.

[crowdin]: https://crowdin.com/project/hammertime
[join our discord server]: https://hammertime.cyou/discord
[#translator-signup]: https://discord.com/channels/952258283882819595/952292965211074650

English and Hungarian translations have been included, so no translators will be needed for these two languages.

<details>
<summary>How to set up Credits generation locally</summary>

> [!NOTE]
> This section is primarily for me, the developer, to be able to refer back to these instructions in the future. However, if you would like to know the process on how to set this up locally, feel free to read on.

1. Obtain a Crowdin API token for your account at https://crowdin.com/settings#api-key
   - You can enter any name you like
   - Check the "Projects" scope and select "Read only" from the dropdown next to it
   - Select "Read and write" in the "Reports" line inside "Projects"
2. Make a copy of `.env.template` at the root of the repository called `.env`
   - This file is normally ignored in version control, if you are committing your changes, make sure it id not included.
3. Fill in the environment variables inside the `.env` file as follows:
   - `CROWDIN_API_KEY` should be set to the token you just created
   - `CROWDIN_PROJECT_IDENTIFIER` is the text-based identifier on the project, this is typically at the end of the project page URL, e.g. in https://crowdin.com/project/hammertime the value that should be entered here is `hammertime`. You must have manager access to the project in question for the script to find it.
   - You can leave the rest of the values as-is.
4. Now you can run `npm run dev` without the warning message related to credit generation
</details>

### Credits

- 🇧🇬 Bulgarian
  - [Alexander](https://crowdin.com/profile/Mr.Shad)
  - [Rxshi](https://crowdin.com/profile/Rxshi)
- Catalan
  - [Casper](https://crowdin.com/profile/JajarGG)
  - [LAU Regi](https://crowdin.com/profile/Bala_de_plata)
  - [Sr_Crix](https://crowdin.com/profile/Sr_Crix)
  - [sware](https://crowdin.com/profile/sware)
- 🇨🇳 Chinese Simplified
  - [Chenyu Wang](https://crowdin.com/profile/w11039685)
  - [CPYW_7226](https://crowdin.com/profile/CPYW_7226)
  - [Faer Yili](https://crowdin.com/profile/yilifaer)
  - [FTVTC\_ Alex.`](https://crowdin.com/profile/htcqqcomm)
  - [Jack Batele](https://crowdin.com/profile/BateleJack)
  - [User670](https://crowdin.com/profile/User670)
  - [姓甚名谁](https://crowdin.com/profile/febilly)
- 🇹🇼 Chinese Traditional
  - [Jackie](https://crowdin.com/profile/jckcr)
  - [ms.investigator](https://crowdin.com/profile/ms.)
  - [notlin4](https://crowdin.com/profile/notlin4)
- 🇭🇷 Croatian
  - [net-tech-](https://crowdin.com/profile/net-tech-)
  - [tovhov](https://crowdin.com/profile/tovhov)
  - [Volvone](https://github.com/volvone)
- 🇨🇿 Czech
  - [Blurplix](https://crowdin.com/profile/Blurplix)
  - [HolyRadek](https://crowdin.com/profile/holyradek)
  - [klauny](https://crowdin.com/profile/klauny)
  - [イーテルニティ ☄️](https://crowdin.com/profile/Ethxrnity)
- 🇩🇰 Danish
  - [jovictasor](https://crowdin.com/profile/jovictasor)
  - [Lennart Christiansen](https://crowdin.com/profile/LennartDenmark)
  - [MikeyDK](https://crowdin.com/profile/MikeyDK)
- 🇳🇱 Dutch
  - [1soldier1pro1](https://crowdin.com/profile/1soldier1pro1)
  - [Jesse](https://github.com/Jessuhh)
  - [MadLad255](https://crowdin.com/profile/MadLad255)
  - [Rohan](https://crowdin.com/profile/SirRohan)
- 🇫🇮 Finnish
  - [Cookie](https://crowdin.com/profile/cookiethegamer33)
  - [Deadly dead](https://crowdin.com/profile/cricribebe)
- 🇫🇷 French
  - [Alex6](https://crowdin.com/profile/Alex6_)
  - [Alexander](https://crowdin.com/profile/Mr.Shad)
  - [Cookie Kiro](https://crowdin.com/profile/Cookikui)
  - [HumainAbsurde](https://crowdin.com/profile/humain)
  - [Kyaz](https://crowdin.com/profile/09kyaz)
  - [M4gicalCat](https://crowdin.com/profile/M4gicalCat)
  - [Malalia Mimi](https://crowdin.com/profile/MialyMusic)
  - [Ouiouibaguette](https://crowdin.com/profile/Ouiouibaguette)
  - [Rosaa Litaa](https://crowdin.com/profile/Rosaalita)
  - [sivelswhy](https://crowdin.com/profile/sivelswhy)
  - [Théo Navas](https://crowdin.com/profile/GrifGrif)
  - [ValouFCH](https://crowdin.com/profile/ValouFCH)
  - [Veivneorul](https://crowdin.com/profile/Veivneorul)
  - [XXL Steve](https://crowdin.com/profile/XXL_Steve)
- 🇩🇪 German
  - [Carlos Diener](https://crowdin.com/profile/carlos.diener)
  - [Fabian9799](https://crowdin.com/profile/Fabian9799)
  - [gsgsgdggfd](https://crowdin.com/profile/gsgsgdggfd)
  - [Julius Geiger](https://crowdin.com/profile/julix00)
  - [The Robot](https://crowdin.com/profile/therobot)
  - [TheOnlyRAK](https://crowdin.com/profile/TheOnlyRAK)
- 🇬🇷 Greek
  - [Belle Bernice](https://crowdin.com/profile/BelleBernice)
  - [dx4](https://crowdin.com/profile/dx4)
- 🇮🇱 Hebrew
  - [Amit Cohen](https://crowdin.com/profile/ZeRealOne)
  - [Arthur](https://crowdin.com/profile/DuperKnight)
  - [didli789](https://crowdin.com/profile/didli789)
- 🇮🇳 Hindi
  - [Balajiasli](https://crowdin.com/profile/Balajiasli)
  - [Natzu](https://crowdin.com/profile/natieon)
- 🇮🇩 Indonesian: [Jackie](https://github.com/Jckcr)
- 🇮🇹 Italian
  - [Lory Pelli](https://github.com/lorypelli)
  - [Spisp](https://crowdin.com/profile/Spisp)
- 🇯🇵 Japanese
  - [eai04191](https://crowdin.com/profile/eai04191)
  - [ms.investigator](https://crowdin.com/profile/ms.)
  - [Phrygia](https://github.com/sjkim04)
  - [sakana](https://crowdin.com/profile/sakana0580)
  - [Shiny4649](https://crowdin.com/profile/Shiny4649)
  - [TheOnlyRAK](https://crowdin.com/profile/TheOnlyRAK)
  - [undefined9651](https://crowdin.com/profile/undefined9651)
  - [ちあたん](https://crowdin.com/profile/chiatan1006)
- 🇰🇷 Korean
  - [Bin](https://crowdin.com/profile/cheesepickle12345678)
  - [Phrygia](https://github.com/sjkim04)
  - [pinedapple (pinedapple)](https://crowdin.com/profile/jayden0108lee)
  - [Sehoon Park](https://crowdin.com/profile/sehoon.sese)
  - [SkyStorage\_](https://crowdin.com/profile/SkyStorage_)
  - [공백](https://crowdin.com/profile/whiteblankzero)
  - [미르냥](https://crowdin.com/profile/Mirnyang)
- 🇱🇻 Latvian
  - [Casper](https://crowdin.com/profile/JajarGG)
  - [Haralds R](https://crowdin.com/profile/haralds.re)
- 🇱🇹 Lithuanian
  - [adome595](https://crowdin.com/profile/adome595)
  - [Seenoc](https://crowdin.com/profile/Seenoc)
  - [tayloryte](https://crowdin.com/profile/tayloryte)
- 🇲🇾 Malay: [Nurul Azeera Hidayah Muhammad Nur Hidayat Yasuyoshi (MNH48)](https://crowdin.com/profile/mnh48)
- Mongolian: [MerlinsBeard](https://crowdin.com/profile/MerlinsBeard)
- 🇳🇴 Norwegian
  - [Ivy Wilson](https://crowdin.com/profile/zach.lawnmower)
  - [Joakim Ødegaard](https://crowdin.com/profile/joakim.od)
  - [Phillip Rødseth](https://crowdin.com/profile/philliphatrod)
  - [Sverre Strømodden Jerstad](https://crowdin.com/profile/sverrejerstad)
  - [Thor](https://crowdin.com/profile/thorarne94)
- 🇮🇷 Persian
  - [Mohammad Safa Gray](https://crowdin.com/profile/DeadMarco)
  - [Not so nice potato](https://crowdin.com/profile/regimanhj)
- 🇵🇱 Polish
  - [Luna A](https://crowdin.com/profile/LumiKitten)
  - [meeekos](https://crowdin.com/profile/meeekos)
  - [MinerPL](https://github.com/minerpl)
  - [Piotr G.](https://crowdin.com/profile/ekidoxx)
  - [stha](https://crowdin.com/profile/sthakrk)
  - [Wojciech Marzec](https://crowdin.com/profile/C.Ezra.M)
- 🇵🇹 Portuguese
  - [ً](https://crowdin.com/profile/buckshot-)
  - [Arthur](https://crowdin.com/profile/DuperKnight)
  - [Casper](https://crowdin.com/profile/JajarGG)
  - [Tiago](https://crowdin.com/profile/DemiCool)
- 🇧🇷 Portuguese, Brazilian
  - [Chris](https://crowdin.com/profile/Chrisdbhr)
  - [Eduardo](https://crowdin.com/profile/Nirewen)
  - [leo0six](https://crowdin.com/profile/leo0six)
  - [ShadowG](https://crowdin.com/profile/ShadowG)
  - [StudentApcaustsy](https://crowdin.com/profile/StudentApcaustsy)
  - [Vinny7x](https://crowdin.com/profile/vinny7x)
- 🇷🇴 Romanian: [mihai](https://crowdin.com/profile/mihaiofficialRO)
- 🇷🇺 Russian
  - [Alexander](https://crowdin.com/profile/Mr.Shad)
  - [Aligatoor](https://crowdin.com/profile/Aligatoor)
  - [Arantir Reinhold](https://crowdin.com/profile/arantirrein)
  - [cfif126](https://crowdin.com/profile/cfif126)
  - [Dead3XD](https://crowdin.com/profile/Dead3XD)
  - [Feor](https://crowdin.com/profile/EL0nMusk)
  - [GameHacker](https://crowdin.com/profile/GameHacker)
  - [JudDayLum Official](https://crowdin.com/profile/JudDayLum)
  - [JudeDM](https://crowdin.com/profile/JudeDM)
  - [Luna](https://crowdin.com/profile/NightyCloud)
  - [Melishy](https://crowdin.com/profile/melishy)
  - [stolarchukboris](https://crowdin.com/profile/PleasedontslammykeyboarddfsdoijfwR)
  - [Vitaliy Kanev](https://crowdin.com/profile/vitalkanev)
  - [Vladimir](https://crowdin.com/profile/bill876)
  - [Крутой Бо](https://crowdin.com/profile/arturfomenko8)
  - [Рейт](https://crowdin.com/profile/helppriklreyta)
  - [Сергей Блохнов](https://crowdin.com/profile/servey22)
- 🇷🇸 Serbian (Latin): [net-tech-#7475](https://nettech.dev/)
- 🇪🇸 Spanish
  - [DrakeZero](https://crowdin.com/profile/DrakeZero)
  - [Sr_Crix](https://crowdin.com/profile/Sr_Crix)
  - [Street Dog](https://crowdin.com/profile/streetdog.arg)
  - [Yareaj](https://github.com/Yareaj/)
- 🇸🇪 Swedish
  - [joll05](https://crowdin.com/profile/joll05)
  - [Liggliluff](https://github.com/Liggliluff)
  - [Ludwig Lannebro](https://crowdin.com/profile/lannebroludwig)
  - [Luna A](https://crowdin.com/profile/LumiKitten)
  - [Noveak](https://crowdin.com/profile/Noveak-Prime)
  - [Patrick Tobias](https://crowdin.com/profile/patricktobias)
  - [Stryxen](https://crowdin.com/profile/Stryxen)
  - [tunket](https://crowdin.com/profile/tunket)
- 🇹🇭 Thai: [timelessnesses](https://github.com/timelessnesses)
- 🇹🇷 Turkish
  - [Baran Moroğan](https://crowdin.com/profile/okunamayanad)
  - [tututuana](https://crowdin.com/profile/tututuana)
  - [x0jony](https://crowdin.com/profile/x0jony)
- 🇺🇦 Ukrainian
  - [Alexander](https://crowdin.com/profile/Mr.Shad)
  - [Bohdan Buchko](https://crowdin.com/profile/Indi_Mops)
  - [GameHacker](https://crowdin.com/profile/GameHacker)
  - [i](https://crowdin.com/profile/enky)
  - [Mykhailo Yaremenko](https://crowdin.com/profile/WhiteBear60)
  - [Кухарчук Ярослав](https://crowdin.com/profile/Gamer_Yaroslaw)
- 🇵🇰 Urdu (Pakistan)
  - [Muhammad Dawood](https://crowdin.com/profile/Developer_X)
  - [muharslan](https://crowdin.com/profile/muharslan)
- 🇻🇳 Vietnamese: [Quan](https://crowdin.com/profile/quanonthecob)

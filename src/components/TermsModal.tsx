
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TermsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TermsModal = ({ open, onOpenChange }: TermsModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl h-[80vh] bg-background border-white/10 p-0 overflow-hidden flex flex-col">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-xl font-serif tracking-tight">Terms & Conditions</DialogTitle>
          <DialogDescription>
            Please read the following terms and conditions carefully.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-1 p-6 pt-0">
          <div className="space-y-6 text-sm text-muted-foreground leading-relaxed pb-6">
            <div className="text-center space-y-2 border-b border-white/10 pb-6 mb-6">
              <h2 className="text-lg font-semibold text-foreground">ROOP STONE IMPEX PRODUCT INCUBATOR 2026</h2>
              <h3 className="text-base text-accent">COMPETITION TERMS & CONDITIONS</h3>
              <p className="text-xs">Last updated: January 30, 2026</p>
            </div>

            <p>
              These Terms & Conditions (“Terms”) govern participation in the Roop Stone Product Incubator 2026 competition and incubator programme (the “Competition”) organised by Roop Stone Impex (“Roop Stone Impex”, “we”, “us”, “our”).
            </p>
            <p>
              By submitting an application, forming or joining a team, attending any related event or residency, or otherwise participating in the Competition, each participant (“you”, “your”, “Participant”) confirms that they have read, understood and agree to be bound by these Terms.
            </p>
            <p>
              If you do not agree to these Terms, you must not participate in the Competition.
            </p>

            <section className="space-y-4">
              <h4 className="text-foreground font-medium">1. ORGANISER DETAILS</h4>
              <p>
                1.1 The Competition is organised by Roop Stone Impex, a firm incorporated/registered under the laws of India, having its principal place of business at Old Ajmer Road, RICCO Industrial Area, Deoli, Rajasthan, India (“Roop Stone Impex”).
              </p>
              <p>
                1.2 Roop Stone Impex may appoint partners, sponsors, jury members, mentors, consultants and service providers (together, “Partners”) to support or help administer the Competition.
              </p>
            </section>

            <section className="space-y-4">
              <h4 className="text-foreground font-medium">2. DEFINITIONS</h4>
              <p>Unless the context requires otherwise:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Application</strong> means the online form, portfolio, proposal, concept note, team information and any other information or material submitted to enter the Competition.</li>
                <li><strong>Competition Website</strong> means the webpages accessible at www.roopstoneimpex.in (including the “Competition” page describing The Roop Stone Impex Product Incubator 2026) as updated from time to time.</li>
                <li><strong>Entry</strong> means any design, concept, drawing, plan, model, video, text, artwork, prototype or other work submitted or developed by a Participant or team in the course of the Competition.</li>
                <li><strong>Residency</strong> means the in‑person design and product development residency held at Roop Stone Impex’s facilities in Rajasthan, India, or at any other location notified by Roop Stone Impex.</li>
                <li><strong>Team</strong> means a group of Participants formally accepted by Roop Stone Impex to participate together in the Competition, typically comprising at least one Architect/Designer, one Geologist/Scientist and one Marketer/Entrepreneur, as described on the Competition Website.</li>
                <li><strong>Winning Team(s)</strong> means the Team(s) ultimately selected by Roop Stone Impex for product launch or commercialization, in its sole discretion.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h4 className="text-foreground font-medium">3. ELIGIBILITY</h4>
              <p>3.1 The Competition is open to:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>a. Natural persons who are at least 18 years of age on the date of Application or have attained the age of majority in their country of residence (whichever is higher); and</li>
                <li>b. Students and professionals in design, architecture, geology, marketing, entrepreneurship or related fields, as further specified on the Competition Website.</li>
              </ul>
              <p>3.2 If you are under 18 (or the age of majority in your jurisdiction), you may only participate with the express written consent of your parent or legal guardian. Roop Stone Impex may request evidence of such consent at any time.</p>
              <p>3.3 Employees, directors and officers of Roop Stone Impex and its group companies, and any person directly involved in organising or judging the Competition (including their immediate family members), are not eligible to participate, unless expressly permitted in writing by Roop Stone Impex.</p>
              <p>3.4 The Competition is void where prohibited or restricted by applicable law. It is your responsibility to ensure that your participation is lawful in your jurisdiction.</p>
              <p>3.5 Roop Stone Impex may require proof of identity, age, qualification or student status, such as a passport, government ID or institutional ID card, and may disqualify any Participant who fails to provide satisfactory evidence.</p>
            </section>

            <section className="space-y-4">
              <h4 className="text-foreground font-medium">4. ACCEPTANCE OF TERMS</h4>
              <p>4.1 By clicking “Apply”, submitting an Application, joining a Team, attending any Competition event (including online sessions, workshops or the Residency), or otherwise taking part in the Competition, you agree to be bound by these Terms, the Competition rules on the Competition Website, and any additional instructions that Roop Stone Impex communicates to Participants.</p>
              <p>4.2 If you are participating on behalf of a Team, you confirm that you are authorised to accept these Terms on behalf of all Team members and that all Team members agree to be bound by them.</p>
            </section>

            <section className="space-y-4">
              <h4 className="text-foreground font-medium">5. APPLICATION & SELECTION</h4>
              <div className="space-y-2">
                <p><strong>5.1 Application Process.</strong> Applications must be submitted through the online form or method specified on the Competition Website, and must include all required information and materials (including portfolios, CVs, concept notes or design samples) by the deadline stated on the Competition Website.</p>
                <p><strong>5.2 Accuracy.</strong> You warrant that all information provided in your Application is true, accurate, complete and not misleading. You must promptly notify Roop Stone Impex of any changes to such information.</p>
                <p><strong>5.3 Number of Entries.</strong> Roop Stone Impex may limit the number of Applications per person or Team and may reject multiple or duplicate Applications at its discretion.</p>
                <p><strong>5.4 Screening & Shortlisting.</strong> Roop Stone Impex will evaluate Applications using criteria such as design quality, originality, feasibility, alignment with the Competition brief, and potential for commercialization, as described on the Competition Website. Roop Stone Impex may conduct interviews, online challenges or additional rounds of screening.</p>
                <p><strong>5.5 Selection Decisions.</strong> All decisions of Roop Stone Impex and its jury regarding eligibility, shortlisting, selection for the Residency, and selection of Winning Teams are final and binding, and no correspondence, appeal or challenge will be entertained.</p>
                <p>5.6 Roop Stone Impex may, at any time and for any reason, refuse any Application or remove any Participant or Team from consideration if, in its opinion, they do not comply with these Terms or the spirit of the Competition.</p>
              </div>
            </section>

            <section className="space-y-4">
              <h4 className="text-foreground font-medium">6. TEAMS</h4>
              <p>6.1 Participants may apply individually and/or as Teams, as specified on the Competition Website. Roop Stone Impex may assist in forming Teams by matching individuals with complementary skills, but final Team composition remains subject to Roop Stone Impex’s approval.</p>
              <p>6.2 Each Team must designate one Team Leader who will be the primary point of contact with Roop Stone Impex and who is authorised to receive communications, sign acknowledgements and make decisions on behalf of the Team. However, each Team member remains individually bound by these Terms.</p>
              <p>6.3 Roop Stone Impex will not be responsible for any internal arrangements, disputes, revenue‑sharing, or ownership issues among Team members. Teams are solely responsible for agreeing among themselves how any rights, responsibilities or benefits are shared.</p>
              <p>6.4 Roop Stone Impex may, in its sole discretion, permit changes in Team composition (e.g., addition or replacement of members) subject to written approval and any conditions it prescribes.</p>
            </section>

            <section className="space-y-4">
              <h4 className="text-foreground font-medium">7. COMPETITION STRUCTURE & TIMELINE</h4>
              <p>7.1 The Competition is broadly structured into several phases, as further detailed on the Competition Website. These may include:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>a. Phase I – Open Call / Virtual Immersion: online community, introductory workshops, and preliminary design or concept submissions;</li>
                <li>b. Phase II – Pitch / Gateway: refinement of concepts, business and marketing plans, and presentation to Roop Stone Impex for shortlisting;</li>
                <li>c. Phase III – Residency (Rajasthan): an in‑person design and product‑development sprint at Roop Stone Impex’s facilities; and</li>
                <li>d. Phase IV – Launch: potential market launch and commercialization of selected products.</li>
              </ul>
              <p>7.2 Roop Stone Impex may modify, postpone, shorten, suspend or cancel any phase of the Competition; change dates, venues, formats (online vs in‑person) or deliverables; or adjust the number of Participants/Teams at each stage, at any time, with or without notice, for any reason including operational or public‑health reasons.</p>
              <p>7.3 Participation in the Residency and subsequent phases is subject to your continued compliance with these Terms, any additional participation agreements (including health & safety and facility‑use rules), and any other documents Roop Stone Impex may require you to sign.</p>
            </section>

             <section className="space-y-4">
              <h4 className="text-foreground font-medium">8. TRAVEL, VISAS, ACCOMMODATION & INSURANCE</h4>
              <p>8.1 Unless expressly stated otherwise on the Competition Website or in written communication, Participants are responsible for arranging and paying for:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>a. travel to and from any Competition location (including the Residency);</li>
                <li>b. visas, work permits, and any other travel or immigration documentation;</li>
                <li>c. travel and health insurance; and</li>
                <li>d. any personal expenses not expressly covered by Roop Stone Impex.</li>
              </ul>
              <p>8.2 Where Roop Stone Impex provides or sponsors accommodation, local transport, meals or stipends, the scope, standard and conditions of such support will be as described on the Competition Website or in written communication to relevant Participants or Teams. Roop Stone Impex reserves the right to substitute or withdraw any such support where reasonably necessary.</p>
              <p>8.3 Participants must comply with all laws and regulations of the host country/state, and with all rules of any accommodation or facilities used in connection with the Competition.</p>
            </section>

            <section className="space-y-4">
              <h4 className="text-foreground font-medium">9. FUNDING, ROYALTIES & COMMERCIAL OPPORTUNITIES</h4>
              <div className="space-y-2">
                <p><strong>9.1 Non‑Guaranteed Benefits.</strong> The benefits described on the Competition Website – including, without limitation, access to Roop Stone Impex’s facilities and mentors, any “Start Fund”, “Seed Fund”, and any potential 15‑year revenue royalty or other revenue‑sharing on products commercialised through Roop Stone Impex – (together, the “Programme Benefits”) are indicative only and are subject to change or cancellation at any time.</p>
                <p><strong>9.2 Subject to Further Agreement.</strong> Any investment, funding, residency grant, stipend, manufacturing support, marketing support, royalty, profit share or other commercial arrangement between Roop Stone Impex and any Participant or Team will be governed by a separate written agreement (such as an incubator agreement, production agreement, license agreement, or royalty agreement) to be executed between the relevant parties (each a “Commercial Agreement”).</p>
                <p><strong>9.3 No Obligation to Commercialise.</strong> Roop Stone Impex has no obligation to manufacture, launch or commercialise any Entry or product, to provide any minimum level of Programme Benefits, or to continue commercialisation once started. Decisions on commercialisation, production volumes, markets, pricing, branding, distribution channels and discontinuation are at the sole discretion of Roop Stone Impex and any relevant Partners.</p>
                <p><strong>9.4 Taxation.</strong> All payments, prizes or benefits received by Participants may be subject to tax, withholding or reporting under applicable law. Participants are solely responsible for their own tax obligations and for obtaining independent tax advice. Roop Stone Impex may deduct applicable taxes at source as required by law.</p>
                <p><strong>9.5 No Employment.</strong> Participation in the Competition and/or receipt of Programme Benefits does not create any employment, partnership, joint venture or agency relationship between any Participant and Roop Stone Impex.</p>
              </div>
            </section>

            <section className="space-y-4">
              <h4 className="text-foreground font-medium">10. INTELLECTUAL PROPERTY</h4>
              <div className="space-y-2">
                <p><strong>10.1 Pre‑Existing IP</strong></p>
                <ul className="list-disc pl-5 space-y-1">
                    <li>a. Each Participant retains ownership of any intellectual property rights (“IP”) they owned prior to the Competition (“Background IP”).</li>
                    <li>b. Nothing in these Terms transfers ownership of a Participant’s Background IP to Roop Stone Impex, except as may be agreed in a subsequent Commercial Agreement.</li>
                </ul>
                <p><strong>10.2 IP in Entries (General Participants)</strong></p>
                <ul className="list-disc pl-5 space-y-1">
                    <li>a. Subject to clause 10.3, as between you and Roop Stone Impex, you (and your Team, as applicable) will own the IP in the original aspects of your Entry that you create during the Competition (“Entry IP”).</li>
                    <li>b. By submitting an Entry, you grant to Roop Stone Impex and its Partners a worldwide, royalty‑free, non‑exclusive, transferable, sublicensable licence to use, reproduce, adapt, modify, publish, translate, distribute, publicly perform and display the Entry (in whole or in part), and to use your name, likeness and biography in connection with the Competition, for the following purposes:
                        <ul className="list-disc pl-5 mt-1 space-y-1 text-muted-foreground/80">
                            <li>administering and evaluating the Competition;</li>
                            <li>showcasing Entries on the Competition Website, at exhibitions, events, and in promotional materials;</li>
                            <li>producing case studies, reports and educational or industry material; and</li>
                            <li>publicising Roop Stone Impex, its products, services and future competitions.</li>
                        </ul>
                    </li>
                    <li>c. This licence is perpetual and irrevocable in respect of uses already made, but Roop Stone Impex will, on reasonable written request, cease using an Entry for new advertising campaigns unrelated to the Competition.</li>
                </ul>
                <p><strong>10.3 IP for Winning Teams and Commercialised Products</strong></p>
                <ul className="list-disc pl-5 space-y-1">
                    <li>a. Where Roop Stone Impex decides to commercialise a product based on an Entry (each a “Product”), the IP ownership and licensing arrangements relating to such Product (including trademarks, designs, copyrights, patents and know‑how) will be governed exclusively by the relevant Commercial Agreement signed with the Participant(s) or Team(s) concerned.</li>
                    <li>b. Such Commercial Agreement may, for example:
                        <ul className="list-disc pl-5 mt-1 space-y-1 text-muted-foreground/80">
                            <li>grant Roop Stone Impex an exclusive or non‑exclusive licence to manufacture, distribute and market the Product; and/or</li>
                            <li>provide for joint or sole ownership arrangements; and/or</li>
                            <li>set out the structure and percentage of any 15‑year revenue royalty, profit‑share or similar arrangement.</li>
                        </ul>
                    </li>
                    <li>c. In case of any conflict between these Terms and a signed Commercial Agreement, the Commercial Agreement shall prevail to the extent of such conflict.</li>
                </ul>
                <p><strong>10.4 Prototypes, Materials & Tools</strong></p>
                <ul className="list-disc pl-5 space-y-1">
                    <li>a. Any physical prototypes, test pieces, moulds, tools or samples created during the Residency or using Roop Stone Impex’s facilities or materials may, at Roop Stone Impex’s discretion, remain the property of Roop Stone Impex, unless expressly agreed otherwise in writing.</li>
                    <li>b. Participants may, however, use photographs, renders and documentation of such prototypes in their professional portfolios, presentations and social‑media posts, provided that:
                         <ul className="list-disc pl-5 mt-1 space-y-1 text-muted-foreground/80">
                            <li>Roop Stone Impex and the Competition are appropriately credited;</li>
                            <li>any confidential or commercially sensitive information identified by Roop Stone Impex is not disclosed; and</li>
                            <li>such use does not suggest that Roop Stone Impex endorses the Participant’s unrelated products or services.</li>
                        </ul>
                    </li>
                </ul>
                 <p><strong>10.5 Warranties & Indemnity on IP</strong></p>
                 <p>You represent and warrant that:</p>
                 <ul className="list-disc pl-5 space-y-1">
                    <li>a. Each Entry is your original work (or that you have obtained all necessary licences and permissions to use any third‑party material included);</li>
                    <li>b. Your Entry, and Roop Stone Impex’s use of it in accordance with these Terms, will not infringe any copyright, moral right, design right, patent, trade secret, privacy right, publicity right, trade mark, contract or other right of any third party;</li>
                    <li>c. You have disclosed any relevant Background IP owned by third parties and obtained all necessary consents.</li>
                 </ul>
                 <p>You agree to indemnify and hold harmless Roop Stone Impex and its Partners from and against any loss, damage, liability, cost or expense (including reasonable legal fees) arising from any third‑party claim that your Entry or participation infringes their rights or breaches these IP provisions.</p>
              </div>
            </section>

            <section className="space-y-4">
              <h4 className="text-foreground font-medium">11. CONFIDENTIALITY & NON‑DISCLOSURE</h4>
              <p>11.1 During the Competition, you may receive or become aware of confidential or proprietary information relating to Roop Stone Impex, its Partners, its clients, its quarries, its manufacturing processes, its business plans, or the Entries of other Participants (“Confidential Information”).</p>
              <p>11.2 You must:
                <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>a. keep all Confidential Information strictly confidential;</li>
                    <li>b. not disclose it to any third party without Roop Stone Impex’s prior written consent; and</li>
                    <li>c. not use it for any purpose other than participating in the Competition.</li>
                </ul>
              </p>
              <p>11.3 These obligations do not apply to information that:
                 <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>a. is or becomes publicly available through no fault of yours;</li>
                    <li>b. was lawfully known to you before disclosure;</li>
                    <li>c. is received from a third party who did not obtain it in breach of any obligation of confidence; or</li>
                    <li>d. must be disclosed by law, court order or governmental authority (in which case you must, where legally permissible, give prompt notice to Roop Stone Impex).</li>
                </ul>
              </p>
              <p>11.4 Roop Stone Impex does not wish to receive confidential information from you that is not necessary for the Competition. Any information you choose to disclose beyond what is requested will be at your own risk.</p>
            </section>

             <section className="space-y-4">
              <h4 className="text-foreground font-medium">12. CONDUCT, HEALTH & SAFETY</h4>
              <p>12.1 You must behave professionally, responsibly and respectfully at all times during the Competition, including online interactions, workshops, the Residency and any public events.</p>
              <p>12.2 You must comply with all instructions, codes of conduct and safety rules notified by Roop Stone Impex, including without limitation:
                 <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>a. health and safety policies at quarries, factories and studios;</li>
                    <li>b. rules relating to machinery, tools, protective equipment and prohibited areas;</li>
                    <li>c. anti‑harassment and non‑discrimination policies; and</li>
                    <li>d. policies on alcohol, drugs, smoking and behaviour at accommodation.</li>
                </ul>
              </p>
              <p>12.3 Roop Stone Impex reserves the right to immediately remove from the Competition any Participant who:
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>a. endangers their own safety or that of others;</li>
                    <li>b. damages equipment, facilities or property;</li>
                    <li>c. harasses, abuses, discriminates against or otherwise behaves inappropriately towards any person; or</li>
                    <li>d. otherwise breaches these Terms or any applicable rules, in Roop Stone Impex’s reasonable opinion.</li>
                </ul>
              </p>
              <p>12.4 You are responsible for your own health and medical needs. You must inform Roop Stone Impex in advance of any medical condition, disability or dietary requirement that may affect your participation, and you must obtain any vaccinations or medical clearances recommended for travel to the Residency location.</p>
            </section>

             <section className="space-y-4">
              <h4 className="text-foreground font-medium">13. PUBLICITY, IMAGE RIGHTS & CONTENT</h4>
              <p>13.1 By participating in the Competition, you consent to Roop Stone Impex and its Partners:
                 <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>a. photographing, filming, live‑streaming or otherwise recording you and your work during Competition activities; and</li>
                    <li>b. using your name, image, likeness, voice, biography, institution or organisation name, city/country of residence, and information about your Entry in connection with:
                         <ul className="list-disc pl-5 mt-1 space-y-1 text-muted-foreground/80">
                            <li>the administration, promotion and documentation of the Competition;</li>
                            <li>promotional and marketing materials for Roop Stone Impex’s products, services and future initiatives; and</li>
                            <li>media coverage, social‑media content, press releases, case studies and events,</li>
                        </ul>
                    </li>
                 </ul>
                 in any media (including print, digital, broadcast and social media), worldwide, for an unlimited period, without further notice or compensation, unless prohibited by law.
              </p>
              <p>13.2 You waive, to the maximum extent permitted by law, any moral rights or similar rights you may have in such recordings and promotional materials, or you agree not to assert them against Roop Stone Impex and its Partners.</p>
              <p>13.3 If you share content about the Competition on social media or other platforms, you agree to comply with all applicable platform terms and with any reasonable branding or attribution guidelines provided by Roop Stone Impex.</p>
            </section>

             <section className="space-y-4">
              <h4 className="text-foreground font-medium">14. DATA PROTECTION & PRIVACY</h4>
              <p>14.1 Roop Stone Impex will process personal data about Participants (such as contact details, education/professional background, portfolio links, recordings and competition performance) for purposes including:
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>a. administering and evaluating Applications and Entries;</li>
                    <li>b. managing participation in the Competition and Residency;</li>
                    <li>c. communicating with Participants;</li>
                    <li>d. complying with legal and regulatory obligations; and</li>
                    <li>e. marketing and promotional activities as set out in these Terms.</li>
                    </ul>
              </p>
              <p>14.2 By applying and participating, you consent to the collection, use and disclosure of your personal data as described in these Terms and in Roop Stone Impex’s Privacy Policy available on the Competition Website.</p>
              <p>14.3 Personal data may be shared with Partners, judges, mentors, service providers and regulatory authorities, and may be transferred outside your country of residence, subject to appropriate safeguards where required by law.</p>
              <p>14.4 You may have rights under applicable data‑protection laws (such as rights of access, correction, withdrawal of consent, or deletion), which you can exercise by contacting Roop Stone Impex at the contact details provided on the Competition Website. Certain data may be retained as required by law or for legitimate business purposes.</p>
            </section>

            <section className="space-y-4">
              <h4 className="text-foreground font-medium">15. DISQUALIFICATION, WITHDRAWAL & TERMINATION</h4>
              <p>15.1 Roop Stone Impex may disqualify any Participant or Team, or terminate their participation at any stage, if:
                 <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>a. they breach or fail to comply with these Terms or any applicable rules or policies;</li>
                    <li>b. their conduct is, in Roop Stone Impex’s opinion, unethical, offensive, unsafe or damaging to Roop Stone Impex’s reputation or operations;</li>
                    <li>c. their Entry is found to be plagiarised, copied, substantially similar to an existing work, or otherwise infringes any third‑party rights;</li>
                    <li>d. they provide false, misleading or incomplete information; or</li>
                    <li>e. they fail to meet any deadline or reasonable request for information.</li>
                 </ul>
              </p>
              <p>15.2 Disqualification may result in loss of eligibility for current and future phases of the Competition, forfeiture of any prizes, benefits or payments not already received, and requirement to return any funds or benefits already provided, where legally permissible.</p>
              <p>15.3 You may withdraw from the Competition at any time by giving written notice to Roop Stone Impex. Withdrawal will not affect any licences or consents already granted under these Terms, or any obligations that by their nature are intended to survive termination (including IP, confidentiality, indemnities and limitations of liability).</p>
              <p>15.4 Roop Stone Impex reserves the right to cancel, shorten, extend, suspend or modify the Competition, or any part of it, if it considers such action necessary or appropriate due to circumstances beyond its reasonable control, including but not limited to force majeure events, public‑health concerns, legal or regulatory changes, or insufficient quality or quantity of Entries.</p>
            </section>

             <section className="space-y-4">
              <h4 className="text-foreground font-medium">16. WARRANTIES, DISCLAIMERS & LIMITATION OF LIABILITY</h4>
              <div className="space-y-2">
                <p><strong>16.1 Your Warranties.</strong> You warrant that:
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>a. you have full power and authority to enter into and perform your obligations under these Terms;</li>
                    <li>b. your participation will comply with all applicable laws, regulations and institutional rules; and</li>
                    <li>c. your Entry and conduct will not violate any rights of third parties.</li>
                    </ul>
                </p>
                <p><strong>16.2 No Warranty by Roop Stone Impex.</strong> The Competition, Residency, Programme Benefits and any related services are provided on an “as is” and “as available” basis. To the maximum extent permitted by law, Roop Stone Impex and its Partners make no warranties or representations, express or implied, regarding:
                     <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>a. the availability, security or error‑free operation of the Competition Website or any application platform;</li>
                    <li>b. the accuracy or completeness of any information or advice provided by Roop Stone Impex, mentors or jury members;</li>
                    <li>c. participants achieving any particular outcome, including commercial success, investment, employment or academic credit; or</li>
                    <li>d. the continuity of any product commercialisation, royalty or partnership arrangement.</li>
                    </ul>
                </p>
                <p><strong>16.3 Limitation of Liability.</strong> To the maximum extent permitted by law:
                     <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>a. Roop Stone Impex and its Partners shall not be liable for any indirect, incidental, consequential, special or punitive damages, or for any loss of profits, revenue, business, goodwill, or data, arising out of or in connection with the Competition or these Terms, even if advised of the possibility of such damages.</li>
                    <li>b. Roop Stone Impex’s total aggregate liability to any Participant arising out of or in connection with the Competition or these Terms shall not exceed the higher of (i) the total amount actually paid by Roop Stone Impex to that Participant under the Competition (excluding reimbursements of third‑party costs), and (ii) INR 25,000, except where liability cannot be limited under applicable law (e.g., for death or personal injury caused by negligence, or fraud).</li>
                    </ul>
                </p>
                <p>16.4 Roop Stone Impex is not responsible for:
                     <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>a. lost, late, incomplete, illegible, corrupted or misdirected Applications or Entries;</li>
                    <li>b. technical failures or malfunctions of hardware, software, servers, networks or internet connections;</li>
                    <li>c. any travel delays, cancellations, accidents, injuries, or losses occurring during travel or participation; or</li>
                    <li>d. acts or omissions of any third parties, including Partners, accommodation providers and transport operators.</li>
                    </ul>
                </p>
              </div>
            </section>

             <section className="space-y-4">
              <h4 className="text-foreground font-medium">17. INDEMNITY</h4>
              <p>You agree to indemnify, defend and hold harmless Roop Stone Impex, its affiliates, Partners, directors, employees, agents and representatives from and against any and all claims, liabilities, damages, losses, costs and expenses (including reasonable legal fees) arising out of or relating to:
                 <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>a. your participation in the Competition;</li>
                    <li>b. your breach of these Terms or any applicable laws; or</li>
                    <li>c. any allegation that your Entry or conduct infringes or violates any rights of a third party.</li>
                    </ul>
              </p>
            </section>

             <section className="space-y-4">
              <h4 className="text-foreground font-medium">18. GOVERNING LAW & DISPUTE RESOLUTION</h4>
              <p>18.1 These Terms and any dispute or claim arising out of or in connection with them or the Competition shall be governed by and construed in accordance with the laws of India, without giving effect to conflict‑of‑law rules.</p>
              <p>18.2 Subject to clause 18.3, the courts at Deoli, Rajasthan, India shall have exclusive jurisdiction to settle any dispute arising out of or in connection with these Terms or the Competition.</p>
              <p>18.3 Roop Stone Impex may, at its sole discretion, require that any such dispute first be referred to mediation or arbitration in Deoli, Rajasthan, India, under rules and before a mediator/arbitrator it designates, before resorting to court proceedings.</p>
            </section>

            <section className="space-y-4">
              <h4 className="text-foreground font-medium">19. MISCELLANEOUS</h4>
              <div className="space-y-2">
                <p><strong>19.1 Changes to Terms.</strong> Roop Stone Impex may amend these Terms at any time by posting an updated version on the Competition Website. Material changes will, where practicable, be notified to Participants by email or other reasonable means. Your continued participation after such changes constitutes acceptance of the revised Terms.</p>
                <p><strong>19.2 No Waiver.</strong> No failure or delay by Roop Stone Impex in exercising any right or remedy under these Terms shall operate as a waiver of that or any other right or remedy.</p>
                <p><strong>19.3 Severability.</strong> If any provision of these Terms is held to be invalid, unlawful or unenforceable by a court of competent jurisdiction, such provision shall be deemed modified to the minimum extent necessary to make it valid and enforceable, and the remaining provisions shall remain in full force and effect.</p>
                <p><strong>19.4 Assignment.</strong> You may not assign or transfer any of your rights or obligations under these Terms without Roop Stone Impex’s prior written consent. Roop Stone Impex may assign or transfer these Terms, in whole or in part, to any affiliate or successor without your consent.</p>
                <p><strong>19.5 Entire Agreement.</strong> These Terms, together with any additional rules or notices on the Competition Website and any executed Commercial Agreement, constitute the entire agreement between you and Roop Stone Impex relating to the Competition and supersede all prior communications or understandings (whether oral or written) relating to the same subject matter.</p>
                <p><strong>19.6 Notices.</strong> Any notices to Roop Stone Impex shall be sent to the contact details specified on the Competition Website, marked for the attention of “Roop Stone Impex Product Incubator 2026 – Competition Team”. Notices to Participants may be sent to the email address provided in the Application or via announcements on the Competition Website.</p>
              </div>
            </section>

          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

import { Component } from "@angular/core";

@Component({
    selector: "app-faq",
    templateUrl: "./faq.component.html",
    styleUrls: ["./faq.component.scss"]
})

export class FAQComponent {
    
    questions = [
        {
            Header: "Top most optizied websites",
            Content: "Quidam officiis similique sea ei, vel tollit indoctum efficiendi ei, at nihil tantas platonem eos. Mazim nemore singulis an ius, nullam ornatus nam ei.",
            Expanded: false
        }, 
        {
            Header: "Recent tips for startups",
            Content: "Quidam officiis similique sea ei, vel tollit indoctum efficiendi ei, at nihil tantas platonem eos. Mazim nemore singulis an ius, nullam ornatus nam ei.",
            Expanded: false
        }, 
        {
            Header: "Ways to transform your site",
            Content: "Quidam officiis similique sea ei, vel tollit indoctum efficiendi ei, at nihil tantas platonem eos. Mazim nemore singulis an ius, nullam ornatus nam ei.",
            Expanded: false
        }, 
        {
            Header: "Keyword search",
            Content: "Quidam officiis similique sea ei, vel tollit indoctum efficiendi ei, at nihil tantas platonem eos. Mazim nemore singulis an ius, nullam ornatus nam ei.",
            Expanded: false
        }, 
        {
            Header: "Flexible design standards",
            Content: "Quidam officiis similique sea ei, vel tollit indoctum efficiendi ei, at nihil tantas platonem eos. Mazim nemore singulis an ius, nullam ornatus nam ei.",
            Expanded: false
        },
    ];
}
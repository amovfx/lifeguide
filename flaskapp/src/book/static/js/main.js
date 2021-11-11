

import {CreateBookEventListeners, EventStrategyDesktop} from "./events";
import Book from "./book/book";
import {DOMAINS} from "./data_resolver/data_resolver";



var Guide = Book.Initialize(DOMAINS.WEB2);
var Event_Strategy = new EventStrategyDesktop(Guide);

CreateBookEventListeners(Event_Strategy);



import {CEventStrategyDesktop} from "./events";
import {CBookInterface} from "../book_interface/book_interface";

describe("Event Strategy Tests", () =>
{
    let BookInterface = new CBookInterface();
    it("Initialize DesktopStrategy", () =>
    {
        let EventStrategy = new CEventStrategyDesktop(BookInterface);
        expect(EventStrategy).toBeInstanceOf(CEventStrategyDesktop);
    })
})
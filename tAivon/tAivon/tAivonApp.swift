//
//  tAivonApp.swift
//  tAivon
//
//  Created by Jared Manwaring on 11/20/23.
//

import SwiftUI

@main
struct tAivonApp: App {
    let persistenceController = PersistenceController.shared

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(\.managedObjectContext, persistenceController.container.viewContext)
        }
    }
}

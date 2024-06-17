Handlers.add(
    "ReceiveDiscord",
    Handlers.utils.hasMatchingTag("Action", "ReceiveDiscord"),
    function(m)
        ao.send({Target = "6I1JBBc9SOMtqFxlX7OoYgsMh7QeZk2fFwUCHTUqshg", Action = "Broadcast", Send = "discord", NickName = m.User, Data = m.Data})
    end
)

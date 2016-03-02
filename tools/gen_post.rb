require 'erb'

title = ARGV[0]
categories = ARGV[1]

now = Time.new()

file_name = "#{now.strftime('%Y-%m-%d')}-#{title}.markdown"

puts "title: #{file_name}"

erb = ERB.new <<'END'
---
layout: post
title:  "<%= title %>"
date:   <%= now.strftime('%Y-%m-%d %H:%M:%S %z') %>
categories: <%= categories %>
---
END

body = erb.result

path = "_posts/#{file_name}"

if File.exists?(path)
  puts "#{path} already exists"
else
  File.write(path, body)
  puts "#{path} is genrated!"
end

